import AccessCardStage from "@/components/accessCard/AccessCardStage";
import Section from "@/components/ui/Section";

/**
 * The easter egg.
 *
 * The access card used to be layered over the hero in a 17rem gutter, where it
 * competed with the headline for both attention and bandwidth — three.js and
 * rapier's wasm were being fetched while the first screen was still painting.
 *
 * Here it gets a full-width stage with room for the lanyard to actually swing,
 * and nothing loads until the section is near the viewport. Anyone who scrolls
 * past without touching it has paid nothing for it.
 */
const AccessCard = () => (
  <Section>
    <div className="flex flex-col items-center gap-2 pt-8 text-center">
      <p className="font-pixel text-sm uppercase tracking-wide text-secondary-foreground">
        You found it
      </p>
      <h2 className="font-oswald text-4xl uppercase leading-[105%] text-primary-foreground lg:text-6xl">
        The <span className="italic">access card</span>
      </h2>
    </div>

    <AccessCardStage />
  </Section>
);

export default AccessCard;
