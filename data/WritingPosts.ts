import type { WritingPost } from "@/types/writing-post.interface";

export const writingPosts: WritingPost[] = [
  {
    id: "writing-1",
    title: "Raat Ki Seedhiyon Par",
    coverImageSrc:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1400&q=80",
    coverImageAlt:
      "A quiet moonlit street representing reflective late-night shayari",
    publishedAt: "Mar 2026",
    tags: ["shayari", "hindi", "late-night"],
    content:
      "Raat ki seedhiyon par jab hawa dheere se baithti hai,\nmain aksar apne sawaalon ko naam deta hoon.\n\nKuch tum tak pahunch jaate hain,\nkuch kaagaz par thahar kar sher ban jaate hain.\n\nSubah aati hai to lagta hai\nki dard bhi ek hunar hai—\nagar usse lafzon mein rakha jaaye.",
  },
  {
    id: "writing-2",
    title: "Ink Between Two Silences",
    coverImageSrc:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
    coverImageAlt:
      "Notebook and pen on desk symbolizing poetry and storytelling craft",
    publishedAt: "Feb 2026",
    tags: ["poem", "english", "minimal"],
    content:
      "I wrote your name in the margin of a winter page,\nnot to keep you,\nbut to remember how warmth sounds.\n\nBetween two silences,\nink learned the shape of breath,\nand every line I crossed out\nstill whispered your rhythm.\n\nSome poems are not finished—\nthey simply become places\nwe return to.",
  },
  {
    id: "writing-3",
    title: "The Boy Who Collected Evenings",
    coverImageSrc:
      "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?auto=format&fit=crop&w=1400&q=80",
    coverImageAlt:
      "Warm sunset over a city lane evoking a short story atmosphere",
    publishedAt: "Jan 2026",
    tags: ["story", "short-fiction", "coming-of-age"],
    content:
      "Every evening, Aarav would fold the sky into tiny notes.\nHe wrote things nobody asked about: the tea-stall radio, the half-smile of strangers, the color of dust at sunset.\n\nYears later, when the city became louder and people forgot to look up, he opened the old box and read one note aloud.\nThe room became quiet.\n\n'You can lose many things in life,' he said,\n'but never lose your way of noticing.'\n\nThat night, everyone walked home a little slower.",
  },
];