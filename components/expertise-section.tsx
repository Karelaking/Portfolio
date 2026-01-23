import { useMemo } from "react";
import { SectionContainer } from "./ui/section-container";
import {
  IconBrandReactNative,
  IconBrandTailwind,
  IconBrandRedux,
  IconBrandNodejs,
  IconBrandNpm,
  IconBrandNextjs,
  IconBrandDocker,
  IconBrandGithub,
  IconBrandPython,
  IconBrandTypescript,
  IconBrandMongodb,
  IconApi,
  IconCoffee,
  IconBrandSupabase,
} from "@tabler/icons-react";

/* =========================
   SKILLS DATA
========================= */
const skills = [
  { id: "js", name: "JavaScript", icon: <IconBrandNodejs /> },
  { id: "ts", name: "TypeScript", icon: <IconBrandTypescript /> },
  { id: "react", name: "React", icon: <IconBrandReactNative /> },
  { id: "next", name: "Next.js", icon: <IconBrandNextjs /> },
  { id: "node", name: "Node.js", icon: <IconBrandNpm /> },
  { id: "express", name: "Express" },
  { id: "docker", name: "Docker", icon: <IconBrandDocker /> },
  { id: "git", name: "Git & GitHub", icon: <IconBrandGithub /> },
  { id: "tailwind", name: "Tailwind CSS", icon: <IconBrandTailwind /> },
  { id: "redux", name: "Redux", icon: <IconBrandRedux /> },
  { id: "fastapi", name: "FastAPI", icon: <IconApi /> },
  { id: "python", name: "Python", icon: <IconBrandPython /> },
  { id: "mongodb", name: "MongoDB", icon: <IconBrandMongodb /> },
  { id: "java", name: "Java", icon: <IconCoffee /> },
  { id: "supabase", name: "Supabase", icon: <IconBrandSupabase /> },
];

/* =========================
   TYPES
========================= */
type Skill = {
  id: string;
  name: string;
  icon?: React.ReactNode;
};

type Variant = "small" | "wide" | "tall" | "large";

type TSkillCard = Skill & {
  variant: Variant;
};

/* =========================
   WORD-COUNT AWARE LAYOUT
========================= */
function getVariantFromWordCount(name: string): Variant {
  const words = name.trim().split(/\s+/).length;
  const chars = name.length;

  if (words >= 3 || chars > 18) return "large";
  if (words >= 2 || chars > 16) return "tall";
  if (chars > 8) return "wide";
  return "small";
}

function generateSkillLayout(skills: Skill[]): TSkillCard[] {
  const shuffled = [...skills].sort(() => Math.random() - 0.5);

  const MAX_LARGE = Math.max(1, Math.floor(skills.length / 5));
  let largeCount = 0;

  return shuffled.map((skill, index) => {
    let variant = getVariantFromWordCount(skill.name);

    // Cap large cards to avoid grid fragmentation
    if (variant === "large") {
      if (largeCount >= MAX_LARGE) {
        variant = "tall";
      } else {
        largeCount++;
      }
    }

    // Early vertical anchoring
    if (index < 2 && variant === "small") {
      variant = "tall";
    }

    return {
      ...skill,
      variant,
    };
  });
}

/* =========================
   CARD COMPONENT
========================= */
const variantStyles: Record<Variant, string> = {
  small: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  tall: "col-span-2 row-span-2",
  large: "col-span-3 row-span-2",
};

function SkillCard({ name, variant, icon }: TSkillCard) {
  return (
    <div
      className={`
        ${variantStyles[variant]}
        flex flex-col items-center justify-center
        gap-2
        rounded-2xl
        bg-gray-100/80
        border border-gray-300
        shadow-md
        transition-transform
        hover:scale-[1.03]
        backdrop-blur-2xl
        dark:bg-gray-800
        dark:border-gray-600
        px-3 py-3
        overflow-hidden
      `}
    >
      {/* Icon */}
      {icon && (
        <span className="shrink-0 text-neutral-700 dark:text-neutral-200">
          {icon}
        </span>
      )}

      {/* Text */}
      <span
        className="
          text-center
          text-sm
          font-semibold
          leading-snug
          text-neutral-800
          dark:text-gray-100
          line-clamp-2
          break-words
        "
        title={name}
      >
        {name}
      </span>
    </div>
  );
}


/* =========================
   SECTION COMPONENT
========================= */
export function ExpertiseSection() {
  const layout = useMemo(() => generateSkillLayout(skills), []);

  return (
    <SectionContainer>
      <div
        id="expertise"
        className="mx-auto flex min-h-screen flex-col items-center justify-center py-10"
      >
        <div className="grid grid-cols-4 grid-flow-dense auto-rows-[88px] gap-3">
          {layout.map((skill) => (
            <SkillCard key={skill.id} {...skill} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
