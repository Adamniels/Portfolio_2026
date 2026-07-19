# Campaign optimizer — portfolio visual set

A three-part SVG sequence that explains the cart campaign optimizer used in Vend & Go.
It is deliberately split so the conflict, the search, and the result each get one uncluttered frame
instead of one overloaded diagram.

All product names, prices, quantities, and campaign definitions below are **synthetic** and safe for a
public portfolio. No partner data, customer data, real machine identifiers, locations, or confidential
campaign configurations appear anywhere in the set.

---

## The visuals — number, order, and purpose

Three visuals, shown in order:

1. **`campaign-optimizer-01-setup.svg`** — *Setup & competing campaigns.*
   Establishes the problem before any algorithm: the cart is stored as grouped product quantities,
   and four campaigns want overlapping units, so they cannot be chosen independently.

2. **`campaign-optimizer-02-search.svg`** — *Recursive search & memoization.*
   Shows the solver applying a bundle, removing those units, and recursing. It contrasts the optimal
   converging path (with a real memoization reuse) against the rejected "biggest discount first" branch.

3. **`campaign-optimizer-03-result.svg`** — *Winning assignment.*
   Shows every unit assigned to exactly one campaign, the exact totals, and why the largest single
   discount is not in the answer.

### Why three and not four (or one)

One image cannot hold the cart, four competing campaigns, a six-state search, a memo reuse, and the final
assignment without becoming unreadable. Splitting into more than three fragments the single continuous idea
(conflict → search → result) and forces repetition of the cart on every frame. Three frames map one-to-one
onto the three questions a viewer asks — *what is the problem, how is it solved, what came out* — and
memoization fits naturally inside the search frame because the reuse **is** part of the search. This matches
the algorithm doc's own framing (grouped state → memoized recursion → non-overlapping split).

---

## Source files used (verified)

Read directly and treated as authoritative:

- `apps/api/src/application/usecases/campaign/get-best-cart-campaign-discount.use-case.ts` — the solver
- `apps/api/src/application/usecases/campaign/get-best-cart-campaign-discount.use-case.spec.ts` — behaviour oracle
- `apps/api/src/domain/campaign/campaign-bundle.ts` — `productGroups` slots, `calculatePrice`
- `apps/api/src/domain/campaign/campaign-price-reduction.ts` — per-unit price reduction, `calculatePrice`
- `apps/api/src/domain/campaign/price-reduction.ts` — `PriceReduction` union (`percent` | `new_price`)
- `apps/api/src/application/dto/campaign/get-best-cart-campaign-discount.ts` — output shape
- `docs/applying-best-campaing/applying-best-campaing-algorithm.md` — algorithm write-up

---

## Verified example input

A cart on one machine with three distinct products (five units total):

| Product | id | Unit price | Quantity |
| --- | --- | ---: | ---: |
| Soda | A | 20 kr | 2 |
| Juice | B | 30 kr | 1 |
| Water | C | 20 kr | 2 |

Grouped state key: `A:2 | B:1 | C:2`. Cart total before discount: **110 kr**.

### Campaign definitions

| Campaign | Type | Rule | Consumes | Discount |
| --- | --- | --- | --- | ---: |
| Soda + Juice Meal | bundle | slots `[A]`,`[B]` — 40% off pair | 1 Soda + 1 Juice | **20 kr** (largest single) |
| Soda Twins | bundle | slots `[A]`,`[A]` — 30% off pair | 2 Soda | 12 kr |
| Water Pair | bundle | slots `[C]`,`[C]` — 30% off pair | 2 Water | 12 kr |
| Juice Deal | price reduction | Juice 30 kr → 12 kr | 1 Juice | 18 kr |

Discount math: Meal `50 × 0.40 = 20`; Soda Twins `40 × 0.30 = 12`; Water Pair `40 × 0.30 = 12`;
Juice Deal `30 − 12 = 18`.

### Exact winning assignment (verified)

| Campaign | Units consumed | Discount |
| --- | --- | ---: |
| Soda Twins | Soda ×2 | 12 kr |
| Water Pair | Water ×2 | 12 kr |
| Juice Deal | Juice ×1 | 18 kr |

- **Total discount: 42 kr.** Total after discount: **68 kr** (110 − 42).
- Every one of the five units is assigned to exactly one campaign. No unit is in two campaigns.
- **Soda + Juice Meal (20 kr, the largest single discount) is NOT used.**

### Why the competing alternative loses

Taking the biggest single discount first — Soda + Juice Meal (20 kr) — spends the one Juice (which blocks
the 18 kr Juice Deal) and leaves a single lone Soda that Soda Twins can no longer pair. The best that branch
can reach is Meal 20 + Water Pair 12 = **32 kr**. On the exact same Soda + Juice units, `12 + 18 = 30`
beats `20`, so the optimizer refuses the Meal. This is why a greedy "largest discount first" rule is unsafe
here: campaigns compete for the same units, so a locally biggest choice can strand more value than it saves.

---

## Plain-language explanation of the grouped state

The cart is not a list of individual unit objects. It is a map of `productTypeId → remaining count`
(`A:2 | B:1 | C:2`), capped to what the machine can actually dispense. Two Sodas are the single fact "A:2",
not "soda #1" and "soda #2". Adding another Soda just increments the counter, so the number of distinct
states grows with the product of `(quantity + 1)` per product type rather than `2^(units)`. This is the
representation shown on frame 1 and used as the node label throughout frame 2.

## Plain-language explanation of the memoization key

Each solver state is turned into a canonical string: positive counts only, sorted alphabetically, joined by
`|` — for example `{ B: 1 }` becomes the key `B:1`. Because ordering within the key is fixed and zero counts
are dropped, any two branches that arrive at the same remaining quantities produce the **same** key and hit
the cache.

In the example this fires for real. Soda Twins consumes `A:2` and Water Pair consumes `C:2` — disjoint sets —
so applying them in either order both arrive at the remaining state `B:1`. The first branch computes
`solve(B:1) = 18 kr`; the second branch reaches the identical key `B:1` and reuses the cached result instead
of recomputing. (The empty-vs-`A:1` reconvergence in the rejected branch behaves the same way.) Frame 2
labels the shared node "computed once → reused".

## Why the example is appropriately complex

It exercises every behaviour the visuals need to explain, and no more:

- **Grouped quantities** — two products have quantity 2 (`A:2`, `C:2`), consumed as whole groups.
- **Competing assignments** — Soda is contested by Meal and Twins; Juice is contested by Meal and Juice Deal.
- **Non-overlapping consumption** — choosing Soda Twins spends both Sodas, so Meal cannot also take one.
- **Recursive exploration** — the solver visits exactly **6 distinct states**, within the "roughly six" target.
- **Genuine memoization** — two disjoint bundles reconverge on a non-empty state (`B:1`) that is cached and reused.
- **Greedy is unsafe** — the largest single discount (20 kr) is deliberately not in the 42 kr optimum.

Prices, quantities, and discounts are round numbers; the search stays small enough to read end-to-end in
about 20–30 seconds.

---

## Simplifications made in each SVG

- **Frame 1** shows what each campaign *would* consume as `[A] [B]` chips rather than drawing connector lines
  to specific cart tiles; contention is conveyed with the coral "contested" marker and legend.
- **Frame 2** does not draw the full recursion. It shows the optimal converging pair of orderings plus the one
  rejected greedy branch. Other explored states (e.g. `A:1|C:2`, `A:1`) are represented only where they carry
  the story; the internal baseline computed at every node is summarised as "best N" rather than itemised.
- **Frame 2** describes the grouped-vs-unit point in one line; the fuller explanation lives in this file.
- **Frame 3** renders assigned units as filled acid-green tiles (selected) and the rejected Meal as crossed
  coral tiles; it omits the intermediate arithmetic already shown on frame 2.

Colour is never the only signal: selected/optimal items also carry solid tiles and "assigned" text; rejected
items carry an ✕ strike, the "REJECTED" heading, and "unused" labels; memoized reuse carries the
"computed once → reused" label.

---

## Discrepancies between documentation, tests, and implementation

The algorithm doc and the implementation agree on the substance — grouped state map, memoized top-down
recursion, bundle consumption removing units before recursing, per-unit non-bundle baseline, and the
non-overlapping final split. Two things in the implementation are not covered by the prose doc:

1. The solver also treats **expiration** campaigns as non-bundle per-unit deals (fixed 20% off,
   `Math.round(unitPrice * 0.8)`), competing with price reductions for each leftover unit. The example
   intentionally omits expiration campaigns to keep the story to bundles vs price reductions.
2. Ties are broken deterministically: highest total discount, then fewest bundle applications, then the
   lexicographically smaller sorted campaign-id string. The example's 42 kr optimum is unique, so no
   tie-break is exercised in the visuals.

No contradictions were found. Where the doc's worked example differs in numbers, that is a different scenario,
not a disagreement about behaviour.

---

## Verification performed

Because `node_modules` is not installed in this checkout, Jest could not run directly. Instead a JavaScript
replica of the solver was written that mirrors the implementation line-for-line
(`enumerateBundlePatterns`, `computeNonBundleDiscount`, the memoized `solve`, `isBetter` tie-breaks,
`round2`, and the final assembly). The replica was validated against **all 13 committed test fixtures** in
`get-best-cart-campaign-discount.use-case.spec.ts` and reproduced every expected output exactly (13/13).

The example above was then run through that validated replica. It produced:

```
appliedCampaigns:
  bundle Soda Twins  −12 kr  ×1
  bundle Water Pair  −12 kr  ×1
  price  Juice Deal  −18 kr  ×1
totalDiscount: 42, totalBeforeDiscount: 110, totalAfterDiscount: 68
```

The trace confirmed exactly 6 distinct solve states and the memo reuse on state `B:1`, and confirmed the
greedy "Meal first" branch tops out at 32 kr.

---

## Suggested accessible alt text

- **Frame 1 (setup):** "A cart holds two Sodas, one Juice, and two Waters, stored as the grouped key
  A:2, B:1, C:2, total 110 kr. Four campaigns are listed with what each consumes: a Soda plus Juice Meal
  bundle saving 20 kr (the largest single discount), Soda Twins saving 12 kr, Water Pair saving 12 kr, and a
  Juice Deal price reduction saving 18 kr. The Soda and Juice units are marked as contested because more than
  one campaign wants them."
- **Frame 2 (search):** "A recursive search over grouped states. From the root A:2 B:1 C:2, applying Soda
  Twins then Water Pair, or Water Pair then Soda Twins, both reach the same state B:1 — computed once and
  reused — then the Juice Deal gives a total of 42 kr. A separate rejected branch takes the biggest single
  discount, the 20 kr Meal, first; it strands a Soda and blocks the Juice Deal and reaches only 32 kr."
- **Frame 3 (result):** "The winning assignment: Soda Twins takes the two Sodas (−12 kr), Water Pair takes
  the two Waters (−12 kr), and the Juice Deal takes the one Juice (−18 kr). All five units are assigned and no
  unit is in two campaigns. Cart total 110 kr minus 42 kr discount leaves 68 kr. The 20 kr Soda plus Juice
  Meal is crossed out and unused, because on those same units 12 plus 18 equals 30 beats 20."

---

## Recommended placement on the portfolio page

The case study's "supporting visual" slot sits beside the *Campaign optimization algorithm* highlight.

1. Put **frame 1** in that supporting-visual slot as the lead image.
2. Directly below the highlight, place **frames 2 and 3** as an ordered pair — frame 2 then frame 3 — either
   side by side on wide screens or stacked on narrow ones.
3. Keep the one-line captions in page text, outside the SVGs; the images already carry short labels and the
   verified numbers. Do not recombine the three into a single image.

Each SVG is self-contained (a `1600 × 1000` responsive `viewBox`, inline styles, system-font fallbacks —
Manrope/Helvetica for headings, DM Mono/Menlo for technical labels). No external CSS, fonts, scripts, or
images are referenced, so the files drop straight into the page.
