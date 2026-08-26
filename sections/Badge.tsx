import BadgeStage from "@/components/badge3d/BadgeStage";
import Section from "@/components/ui/Section";

/**
 * The easter egg.
 *
 * The badge used to be layered over the hero in a 17rem gutter, where it
 * competed with the headline for both attention and bandwidth — three.js and
 * rapier's wasm were being fetched while the first screen was still painting.
 *
 * Here it gets a full-width stage with room for the lanyard to actually swing,
 * and nothing loads until the section is near the viewport. Anyone who scrolls
 * past without touching it has paid nothing for it.
 */
const Badge = () => (
  <Section>
    <div className="flex flex-col items-center gap-2 pt-8 text-center">
      <p className="font-pixel text-sm uppercase tracking-wide text-secondary-foreground">
        You found it
      </p>
      <h2 className="font-oswald text-4xl uppercase leading-[105%] text-primary-foreground lg:text-6xl">
        Drag <span className="italic">the badge</span>
      </h2>
    </div>

    <BadgeStage />
  </Section>
);

export default Badge;
