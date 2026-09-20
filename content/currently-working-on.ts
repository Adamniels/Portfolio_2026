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
  heroImage: { src: string; alt: string };
  bannerImage: { src: string; alt: string };
  menuImage: { src: string; alt: string; caption: string };
  miniGameImages: Array<{ src: string; alt: string; caption: string }>;
};

export const currentlyWorkingOn: CurrentlyWorkingOn[] = [
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
    heroImage: {
      src: "/currently-working-on/operation-rollout/embervale-board.jpg",
      alt: "Low-poly medieval valley game board seen from above, with a castle at its centre surrounded by forest, paths and villages.",
    },
    bannerImage: {
      src: "/currently-working-on/operation-rollout/embervale-panorama.jpg",
      alt: "Wide panorama render of the Embervale valley board, showing the castle, village, forest and paths across the whole map.",
    },
    menuImage: {
      src: "/currently-working-on/operation-rollout/menu-key-art.jpg",
      alt: "Illustrated key art of the game's main menu: a tabletop scene with a 3D board island, dice, the Operation Rollout wordmark and Quick Join, Host Game and Join Game buttons.",
      caption: "Early key art used as an art direction reference for the main menu.",
    },
    miniGameImages: [
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
];

export function getCurrentlyWorkingOn(slug: string) {
  return currentlyWorkingOn.find((entry) => entry.slug === slug);
}
