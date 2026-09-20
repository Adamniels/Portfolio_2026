// "Currently working on": active side projects that aren't case studies yet,
// either because there's nothing shipped to evaluate or because, like
// Operation Rollout, the point of the write-up isn't the project's own merit.
// One entry now, more expected later (see /currently-working-on/[slug]/page.tsx).
export type CurrentlyWorkingOn = {
  slug: string;
  title: string;
  hook: string;
  status: string;
  technologies: string[];
  intro: string[];
  // Homepage cards are text-only by design; these are detail-page-only and
  // optional, since an early-stage entry (see personal-platform below) may
  // have nothing real to show yet.
  bannerImage?: { src: string; alt: string };
  // Each group is its own labelled block on the detail page: "feature" is one
  // large image, "grid" is several small ones side by side. Shape and count
  // of groups is per project, there's no fixed gallery layout across entries.
  imageGroups?: Array<{
    heading: string;
    layout: "feature" | "grid";
    images: Array<{ src: string; alt: string; caption: string }>;
  }>;
};

export const currentlyWorkingOn: CurrentlyWorkingOn[] = [
  {
    slug: "personal-platform",
    title: "Personal Platform",
    hook: "A long-term personal platform I'm designing to be the one place where every tool, workflow, or automation I come across gets integrated, with a shared memory service that learns about me over time.",
    status: "Under development, since July 2026",
    technologies: ["Rust", "Python", "PostgreSQL", "pgvector"],
    intro: [
      "This is the second version of a personal platform I'm building for myself. I started an earlier version, and instead of patching it forward I stopped and rethought the approach. The earlier version's actual failure was that everything was too tightly coupled, when one of the core ideas is being able to work on features independently and add or remove them easily. Memory ownership was split across two languages, so the boundary between what each side owned kept leaking in practice. There was also a single do-everything call for fetching context that ended up needing a type switch to handle every caller, and a hand-tuned relevance formula with fixed weights I had no way to validate. None of that carries forward as code only a handful of the underlying ideas do, but rebuilt properly.",
      "The idea behind the platform itself is that it's meant to live and grow with me for years, not solve one problem and get abandoned. Whenever I come across something worth folding into how I work, whether that's a new tool, an automation, something embedded, or a piece of software, this is meant to be where I plug it in, as its own isolated feature with its own frontend and backend, coupled to the rest only through a couple of narrow contracts. What makes it a platform rather than a pile of unrelated apps is a shared \"brain\": a dedicated memory service that features can feed events into and that uses AI, offline, to build up a real, structured understanding of me over time, rather than each feature quietly keeping its own guess. Right now this is entirely architecture and design work: I've thought through how the core, the brain, and features should be isolated from each other, how authentication and multi-user isolation should work even though it's just me today, and a long, deliberately non-committal list of feature ideas the design needs to hold up against, projects, learning, a wiki, reading and books, a speed reader, and controllers for other devices among them. None of it is built yet, and the core/feature boundary described in the docs is intent, not implemented code. The next concrete step is the first milestone: a small, genuinely finishable core (accounts, auth, routing) running in parallel with a small brain (profile, events, basic retrieval), connected only by a minimal placeholder feature whose entire job is to prove the contract between them actually holds up.",
    ],
  },
  {
    slug: "operation-rollout",
    title: "Operation Rollout",
    hook: "A local party game for friends and family: different boards, different objectives, and minigames along the way that decide who gets the edge.",
    status: "Under development, since May 2026",
    technologies: ["Unity 6", "C#", "Multiplayer", "iOS"],
    intro: [
      "This one started with an idea for a game we wanted to see through, more as something worth exploring than a plan to become game developers. What's turned out to be the most interesting part is everything around actually building it: planning something this size before writing a line of code, structuring it so it doesn't collapse as it grows, and working as a two person team where someone else's code has to make sense to me and mine to them.",
      "Right now it's me and one other developer, and we work alongside each other across all of it: the board, the rules, the networking, the items, the minigames. Building something like this together makes planning and coordination crucial, probably more than either of us expected going in. The first map, Embervale, is playable: a medieval valley where you race to carry relics back to a castle. More minigames and a second map are still in progress.",
    ],
    bannerImage: {
      src: "/currently-working-on/operation-rollout/embervale-panorama.jpg",
      alt: "Wide panorama render of the Embervale valley board, showing the castle, village, forest and paths across the whole map.",
    },
    imageGroups: [
      {
        heading: "Main menu",
        layout: "feature",
        images: [
          {
            src: "/currently-working-on/operation-rollout/menu-key-art.jpg",
            alt: "Illustrated key art of the game's main menu: a tabletop scene with a 3D board island, dice, the Operation Rollout wordmark and Quick Join, Host Game and Join Game buttons.",
            caption:
              "Early key art used as an art direction reference for the main menu.",
          },
        ],
      },
      {
        heading: "Mini games",
        layout: "grid",
        images: [
          {
            src: "/currently-working-on/operation-rollout/tower-stack-gameplay.jpg",
            alt: "A phone screen showing the Tower Stack minigame in progress, with a stacked tower of timber and stone blocks, a height readout, and on-screen controls to aim, rotate and drop the next piece.",
            caption: "Tower Stack, captured running in-engine.",
          },
          {
            src: "/currently-working-on/operation-rollout/colosseum-arena.jpg",
            alt: "Top-down view of a sandstone colosseum arena with four coloured players holding spears on the sand floor.",
            caption: "The colosseum arena for Hide, Point and Shoot.",
          },
        ],
      },
    ],
  },
];

export function getCurrentlyWorkingOn(slug: string) {
  return currentlyWorkingOn.find((entry) => entry.slug === slug);
}
