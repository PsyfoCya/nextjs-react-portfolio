import Heading from "@/components/heading/Heading";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import Section from "@/components/ui/Section";

const plannedTopics = ["Gaming", "Music", "Photography", "Side projects"];

const Hobbies = () => {
  return (
    <Section>
      <Heading
        number="05"
        title_1="Off"
        title_2="Duty"
        svgText="THIS SECTION IS STILL BEING WRITTEN"
      />
      <div className="py-8">
        <Card>
          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-medium text-primary-foreground xl:text-3xl">
                Hobbies
              </h3>
              <Chip
                label="Coming soon"
                className="border-white/20 bg-white/[0.08] text-primary-foreground"
              />
            </div>
            <p className="max-w-2xl text-[16px] leading-[175%] text-secondary-foreground">
              The part of this site that isn&apos;t work. I&apos;m still putting
              it together — it&apos;ll cover what I do when I&apos;m not in an
              editor, and the things outside software that feed back into it.
            </p>
            <div className="flex flex-wrap gap-2">
              {plannedTopics.map((topic) => (
                <Chip key={topic} label={topic} />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default Hobbies;
