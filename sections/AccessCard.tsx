import AccessCardStage from "@/components/accessCard/AccessCardStage";
import Heading from "@/components/heading/Heading";
import Section from "@/components/ui/Section";

/**
 * The easter egg.
 *
 * The card used to be layered over the hero in a 17rem gutter, where it
 * competed with the headline for both attention and bandwidth — three.js and
 * rapier's wasm were being fetched while the first screen was still painting.
 *
 * Here it gets a full-width stage with room for the lanyard to actually swing,
 * and nothing loads until the section is near the viewport. Anyone who scrolls
 * past without touching it has paid nothing for it.
 */
const AccessCard = () => (
  <Section>
    {/*
      Uses the same Heading as every other section. It used to hand-roll its
      own centred title, so it had no number in the sequence, no ghost numeral
      and no curve divider — the one section that broke the pattern.
    */}
    <Heading
      number="04"
      title_1="Access"
      title_2="Card"
      svgText="DRAG IT, FLING IT, LET IT SETTLE"
    />

    {/*
      Flush against the heading, with no padding between them: the strap is
      meant to read as hanging out of the title itself.
    */}
    <div className="-mt-6">
      <AccessCardStage />
    </div>
  </Section>
);

export default AccessCard;
