# Checkout — "mocked edges" portfolio visual set

A three-frame SVG walkthrough of the Vend & Go checkout: what the server verifies before money moves, how
it orchestrates payment / dispensing / inventory / state, and how the mocked payment and machine edges are
replaceable without touching the checkout core.

Scope is deliberately narrow. This set does **not** re-draw the whole-system architecture, the mobile
checkout UI, or the campaign-optimization algorithm. Campaign pricing appears only as one step
("recompute price") in frame 1; its internal algorithm has its own visual set
(`campaign-optimizer-*`) and is not re-explained here.

All example data is **synthetic**: no customer data, no partner-confidential data, no real vending-machine
IDs, no real payment references, no proprietary campaign definitions.

---

## Visual order and purpose

### 1. `checkout-mocked-edges-01-authority.svg` — *Authoritative pre-flight*
- **Question it answers:** What does the application verify before any money or dispensing is involved?
- **Shows:** client request → load cart (non-empty + machine match) → live stock check → recompute price
  server-side → match the client pricing snapshot (else reject) → persist the order first, as
  `FAILED / RESERVE_FAILED`.
- **Why first:** it establishes that the server is authoritative and self-protecting before the reader sees
  any payment or dispensing. It sets up the guarantee the later frames build on.

### 2. `checkout-mocked-edges-02-orchestration.svg` — *Orchestration & state*
- **Question it answers:** What happens during a checkout, and which state changes at each step?
- **Shows:** the six-call execution order (reserve → dispense per unit → settle → inventory → persist →
  finalize), which two steps cross a mocked edge, a synthetic two-item **partial-dispense** trace with
  verified numbers, and the resulting `order.status` / `payment.status` transitions.
- **Why in the middle:** it is the substance of the feature and carries the partial-failure story, which is
  the most technically interesting behaviour. It depends on frame 1 having established authority.

### 3. `checkout-mocked-edges-03-replaceability.svg` — *Replaceable edges*
- **Question it answers:** What stays stable when payment or vending-machine integrations change?
- **Shows:** the use case depending on `IPaymentService` and `IMachineDispenseService`; current mock and
  real adapters at the edge; future integrations as possible replacements; and an honest note on what a swap
  actually costs.
- **Why last:** it generalises from the concrete run to the architectural payoff — the "mocked edges" claim.

---

## Verified checkout sequence

Source of truth: `apps/api/src/application/usecases/checkout/checkout-cart.use-case.ts`
(`CheckoutCartUseCase.execute`), entered from
`apps/api/src/presentation/checkout/cart-checkout.controller.ts`.

1. **Load cart** — `cartRepository.findByUserIdOrNull(userId)`. Reject if missing/empty
   (`InvalidInputError`) or if `cart.vendingMachineId !== input.vendingMachineId`
   (`CartMachineMismatchError`).
2. **Live stock check** — per cart item, `productBatchRepository.getAvailableQuantity(productTypeId,
   machineId)`; reject if `available < quantity` (`InvalidInputError`).
3. **Recompute price (authoritative)** — `getBestCartCampaignDiscountUseCase.execute({ userId })`, then
   round to `{ fullPrice, discountAmount, netPrice }`.
4. **Match snapshot** — compare the recomputed snapshot field-by-field to `input.pricingSnapshot`; any
   difference throws `CheckoutPricingMismatchError` (HTTP 409). The server never trusts client totals.
5. **Persist order first** — build `Order` with `status = FAILED`, `paymentStatus = RESERVE_FAILED`,
   item rows at `dispensedQuantity = 0`; `orderRepository.create(order)`. Written before contacting the
   payment provider so a crash leaves a safe terminal record, not a phantom pending transaction.
6. **Reserve** — `paymentService.reserve({ userId, orderId, amount = netPrice, paymentMethod })`. On success:
   set `paymentProviderRef`, `paymentStatus = RESERVED`, `orderRepository.markPaymentReserved(...)`. On
   failure: `InsufficientPointsError` is saved and rethrown; anything else is saved and rethrown as
   `PaymentProcessingError`.
7. **Dispense** — for each item, loop `requestedQuantity` times calling
   `machineDispenseService.dispenseOne({ machineId, productTypeId })`; count successes into
   `dispensedQuantity`, remainder into `failedQuantity`. Per-item `lineCapturedAmount` /
   `lineRefundedAmount` are computed with `scaleToNetAmount(full, fullTotal, netTotal)` so line values stay
   within the discounted reserved amount.
8. **Settle** — `capturedAmount = min(reservedAmount, Σ lineCaptured)`;
   `refundedAmount = max(0, reservedAmount − capturedAmount)`. Resolve `order.status`
   (PAID / PARTIALLY_PAID / FAILED) and `order.paymentStatus`
   (CAPTURED / PARTIALLY_CAPTURED / REFUNDED).
9. **Inventory** — for each item with `dispensedQuantity > 0`,
   `productBatchRepository.decrementAvailableQuantity(...)`. If it returns `false`, set
   `paymentStatus = RESERVED` + reconciliation reason, persist via `saveDispenseResult`, and throw
   `InventoryReconciliationNeededError` (HTTP 409). Only dispensed units are decremented.
10. **Persist result** — `orderRepository.saveDispenseResult({ status, capturedAmount, refundedAmount,
    paymentStatus, items })`.
11. **Finalize** — `finalizePaymentWithRetry`: up to `MAX_FINALIZE_ATTEMPTS = 2`; if `capturedAmount > 0`
    call `paymentService.capture(...)`, if `refundedAmount > 0` call `paymentService.refund(...)`. One
    retry; persistent failure saves the order and throws `PaymentProcessingError` (HTTP 502).
12. **Clear cart** — only if `capturedAmount > 0`: `cart.clear()`, `cartRepository.save(cart)`.
13. **Save + points** — `orderRepository.save(order)`, then optional
    `incrementPointsFromOrderUseCase?.execute(savedOrder)`.
14. **Return** — `CheckoutCartOutput`: orderId, status, amounts, and per-item results.

Note on ordering shown in the visuals: the order record is persisted **before** reserve (step 5), and
inventory is decremented **after** dispense and **before** the final capture/refund (steps 9–11). Both are
drawn in that order.

---

## Interfaces and implementations

| Interface or port | Used by | Current implementation | Mock/real | Possible replacement | Evidence |
| --- | --- | --- | --- | --- | --- |
| `IPaymentService` (`reserve` / `capture` / `refund`) | `CheckoutCartUseCase` | `CheckoutPaymentService` routing to `MockPaymentProcessor` and `PointsPaymentProcessor` | mock (card) + real (points) | real card PSP added as a third processor + a `providerRef` prefix | `i-payment-service.ts`; `checkout-payment.service.ts`; `mock-payment.service.ts`; `points-payment.processor.ts` |
| `IMachineDispenseService` (`dispenseOne`) | `CheckoutCartUseCase` | `MockMachineDispenseService` | mock | real machine/hardware adapter implementing `dispenseOne` | `i-machine-dispense-service.ts`; `mock-machine-dispense.service.ts` |
| `IOrderRepository` | `CheckoutCartUseCase` | `PrismaOrderRepository` | real | n/a (already real) | `i-order.repository.ts`; `prisma-order.repository.ts` |
| `ICartRepository` | `CheckoutCartUseCase` | Prisma cart repository | real | n/a | `checkout-cart.use-case.ts` (constructor) |
| `IProductBatchRepository` | `CheckoutCartUseCase` | Prisma product-batch repository | real | n/a | `checkout-cart.use-case.ts` (stock check, decrement) |
| `IPaymentOperationService` (`tryRegister`) | payment processors | `PrismaPaymentOperationService` | real | n/a | `i-payment-operation.service.ts`; `prisma-payment-operation.service.ts` |
| `ICheckoutIdempotencyService` | instant-buy checkout only (not cart) | `PrismaCheckoutIdempotencyService` | real | n/a | `i-checkout-idempotency.service.ts`; controller TODO in `cart-checkout.controller.ts` |

The two genuinely **mocked edges** are therefore payment (card) and machine dispensing. Points is already a
real implementation of the same payment interface — a useful proof that the boundary is real, not just a
seam around a single mock.

---

## State transitions

**Payment status** (`order.ts`): `RESERVE_FAILED` (initial) → `RESERVED` (after successful reserve) →
`CAPTURED` | `PARTIALLY_CAPTURED` | `REFUNDED` (after settle). Inventory-decrement failure parks it back at
`RESERVED` with a reconciliation reason for an operator.

**Order status** (`order.ts`): `FAILED` (initial) → `PAID` (all units dispensed) | `PARTIALLY_PAID` (some
dispensed, some failed) | `FAILED` (none dispensed).

**Inventory:** `decrementAvailableQuantity` runs once per product with a positive dispensed count, for the
dispensed quantity only. Failed units never decrement stock.

**Item-level results:** each `OrderItem` carries `requestedQuantity`, `dispensedQuantity`, `failedQuantity`,
`lineCapturedAmount`, `lineRefundedAmount`; surfaced in `CheckoutCartOutput.items`.

**Failure / partial-success outcomes (all test-verified):**
- empty cart / machine mismatch / insufficient stock → reject before money;
- pricing snapshot mismatch → 409 before money;
- reserve failure → `InsufficientPointsError` (400) or `PaymentProcessingError` (502), order saved `FAILED`;
- partial dispense → `PARTIALLY_PAID` / `PARTIALLY_CAPTURED`, proportional refund;
- no dispense → `FAILED` / `REFUNDED`, cart **not** cleared;
- inventory decrement failure → `InventoryReconciliationNeededError` (409), payment left `RESERVED`;
- capture/refund failure → retried once, then `PaymentProcessingError` (502).

### Synthetic example used in frame 2 (verified)

Cart at one machine: **Sparkling Water 15 kr ×2**, **Energy Bar 30 kr ×1** → full 60 kr, campaign −12,
net 48 kr reserved. Dispense: Water 1 ok / 1 jam, Bar 1 ok.

| Product | requested | dispensed | failed | captured | refunded |
| --- | ---: | ---: | ---: | ---: | ---: |
| Sparkling Water | 2 | 1 | 1 | 12 | 12 |
| Energy Bar | 1 | 1 | 0 | 24 | 0 |
| **Totals** | 3 | 2 | 1 | **36** | **12** |

Line values use `scaleToNetAmount` (scale 48/60 = 0.8). `captured 36 + refunded 12 = 48` reserved;
`order.status = PARTIALLY_PAID`, `payment.status = PARTIALLY_CAPTURED`; inventory −1 Water, −1 Bar; cart
cleared because captured > 0. Numbers were recomputed with the exact code formulas.

---

## Source evidence

| Claim | Path | Symbol / test | Proves |
| --- | --- | --- | --- |
| Server recomputes price and rejects a stale client snapshot | `apps/api/src/application/usecases/checkout/checkout-cart.use-case.ts` | pricing block → `CheckoutPricingMismatchError` | totals are authoritative, client is not trusted |
| Order persisted as FAILED/RESERVE_FAILED before reserve | same | `new Order(... "FAILED" ... "RESERVE_FAILED")` then `orderRepository.create` | crash-safe pre-state |
| One dispense call per unit; partial tallied | same | dispense loop `for i < requestedQuantity` | item-level partial dispense |
| Capture/refund scaled and bounded to reserved | same | `scaleToNetAmount`, `Math.min(reservedAmount, ...)` | no over-capture |
| Inventory decremented for dispensed units only; failure → reconcile | same | `decrementAvailableQuantity`, `InventoryReconciliationNeededError` | inventory correctness + safe halt |
| Finalize retried once | same | `finalizePaymentWithRetry`, `MAX_FINALIZE_ATTEMPTS = 2` | recoverable settle |
| Payment interface | `.../abstractions/services/i-payment-service.ts` | `IPaymentService` | stable payment contract |
| Payment routing mock vs points | `.../infrastructure/checkout/checkout-payment.service.ts` | `getProcessor`, `getProcessorFromProviderRef` | replaceable payment edge with real + mock impls |
| Payment mock | `.../infrastructure/checkout/mock-payment.service.ts` | `MockPaymentProcessor` | placeholder card provider |
| Dispense interface + mock | `.../abstractions/services/i-machine-dispense-service.ts`, `.../infrastructure/checkout/mock-machine-dispense.service.ts` | `IMachineDispenseService`, `MockMachineDispenseService` | replaceable machine edge |
| Behaviour outcomes | `apps/api/src/application/usecases/checkout/checkout-cart.use-case.spec.ts` | `returns paid…`, `returns partially_paid…`, `returns failed…`, `throws pricing mismatch…`, `throws inventory reconciliation…`, `throws payment processing error…`, `retries payment finalization…` | every status/partial/failure path |

---

## Simplifications

- Frame 1 groups the guard chain into five numbered steps; error codes are shown as short tags
  (e.g. `PricingMismatch → 409`) rather than full exception names.
- Frame 2 renders the six use-case calls as one row; the "after finalize" cart-clear and points steps are a
  single caption rather than boxes. The state-transition panel shows the three terminal options and marks
  the run's path with ★ instead of drawing every edge.
- The example uses friendly product names (Sparkling Water, Energy Bar) and a round 20% discount so the
  scaling math lands on integers; the real code path and formulas are unchanged.
- Frame 3 abstracts each Prisma repository into one "Prisma repositories" box and shows the payment
  processors as children of the router rather than the full DI wiring. `IPaymentOperationService` (the
  capture/refund idempotency log) and the instant-buy idempotency service are omitted to keep the boundary
  legible; both are noted here.
- "Mock edge" is the label used for placeholder adapters; PointsPaymentProcessor is labelled REAL to avoid
  implying the whole payment boundary is fake.

---

## Suggested captions (external, one per SVG)

1. **Authority —** "Before any money moves, the server reloads the cart, rechecks stock, recomputes the
   price itself, and rejects a mismatched client snapshot — then writes the order in a safe failed state."
2. **Orchestration —** "A single use case reserves, dispenses unit by unit, settles capture and refund,
   decrements only what dispensed, and returns item-level results — here a two-item cart with one jammed
   unit ends PARTIALLY_PAID."
3. **Replaceable edges —** "Checkout depends on payment and dispense interfaces; mocks stand in today and a
   real provider implements the same contract without changing the checkout use case."

---

## Accessible alt text

- **Frame 1 (authority):** "A left-to-right guard sequence. A client request enters and passes five checks
  before payment: load cart (non-empty, machine match), live stock check, recompute price server-side, and
  match the client's pricing snapshot — a mismatch is rejected with 409. The last step persists the order
  first, in a safe failed state marked status FAILED and payment RESERVE_FAILED, before the payment provider
  is contacted. A note explains this avoids phantom pending transactions if the process crashes."
- **Frame 2 (orchestration):** "Top row: six execution steps — Reserve, Dispense, Settle, Inventory,
  Persist, Finalize. Reserve, Dispense and Finalize are tagged as crossing a mocked edge (payment or
  machine). Bottom left: a synthetic two-item cart, Sparkling Water 15 kr times two and Energy Bar 30 kr,
  full 60 kr minus 12 campaign equals 48 net reserved. Water dispenses 1 of 2 (one jam), Bar dispenses 1 of
  1; captured 36, refunded 12, summing to the 48 reserved. Bottom right: order status moves FAILED to
  PARTIALLY_PAID, and payment status moves RESERVE_FAILED to RESERVED to PARTIALLY_CAPTURED, with the run's
  path starred."
- **Frame 3 (replaceable edges):** "A hexagonal-style boundary diagram in three zones. Left, application
  core: CheckoutCartUseCase, marked unchanged when a provider changes. Middle, ports: IPaymentService with
  reserve, capture, refund, and IMachineDispenseService with dispenseOne — the core depends on these. Right,
  infrastructure edge: CheckoutPaymentService routes to a MockPaymentProcessor (mock card placeholder) and a
  PointsPaymentProcessor (real), with a dashed future real card PSP adapter; MockMachineDispenseService (mock)
  with a dashed future real machine adapter; and Prisma repositories marked real with no mock. A legend
  distinguishes core, interface/real adapter, mock adapter, and future integration. A closing note states
  that swapping in a real provider means writing one adapter to the existing interface and registering it
  (payment also adds a route and providerRef prefix), while the use case orchestration is not rewritten."

---

## Integration recommendation

- **Order:** 01 authority → 02 orchestration → 03 replaceable edges.
- **Count:** three frames. The code supports all three distinctly, and the partial-dispense behaviour is
  substantial enough that collapsing frame 2 would lose the most interesting part of the story.
- **First frame:** 01 (authority). It frames the server as trustworthy before the reader sees payment or
  dispensing.
- **Explanatory notes outside the SVG:** none are strictly required — each frame is self-contained — but the
  captions above improve scannability in the carousel. If space is tight, frame 3's "what swapping actually
  costs" line can move to the page caption instead of living inside the image.

### Suggested portfolio-wording correction

The three current bullet points are accurate but slightly under-specified. Optional tightening:

- "reserves payment, invokes dispensing, updates inventory and payment state, and returns item-level
  results" → add that the order is persisted first in a safe failed state, and that inventory is updated
  after dispensing and before the final capture/refund.
- "Mock services implement the same interfaces intended for future providers, keeping integration changes at
  the edges" → true; worth noting a real payment provider also plugs into the payment router (a route + a
  providerRef prefix), while the checkout use case itself is unchanged. The points payment method is already
  a real, non-mock implementation of that same interface.

---

## Validation performed

- Every step and status was traced in `checkout-cart.use-case.ts` and cross-checked against the assertions
  in `checkout-cart.use-case.spec.ts` (paid / partially_paid / failed, pricing mismatch, inventory
  reconciliation, capture-succeeds-refund-fails, finalize retry).
- The frame-2 example numbers were recomputed with the exact `scaleToNetAmount` and capture/refund formulas
  (captured 36, refunded 12).
- All three SVGs validate as XML, render cleanly at 1000 px with no clipping, use a `1600 × 1000` viewBox,
  and reference no external CSS, fonts, scripts, or images (only the SVG namespace URL).
- Jest was **not** executed: `node_modules` is not installed in this checkout, so the tests were read and
  used as an oracle rather than run.

### Remaining uncertainties

- Tests were not executed in this environment, only read; the behaviour claims rest on the source and the
  committed test expectations.
- The exact shape of a future real payment/machine adapter is illustrative. The interfaces are real and
  stable, but a specific provider may need extra wiring (auth, webhooks, batch dispense) beyond implementing
  the current method signatures — hence the deliberately hedged "what swapping actually costs" note.
