import Card from "../ui/Card";

const BackgroundCard = () => {
  return (
    <Card className="md:h-full">
      <div>
        <p className="leading-[170%] font-normal text-white/[0.4] text-[16px]">
          I was born in{" "}
          <span className="text-white underline">
            Frankfort, a small town in the Free State
          </span>
          , and spent my early years at my mother&apos;s aunt&apos;s homestead
          there before we moved to Ennerdale, in Johannesburg South, when I was
          three.
          <br />
          <br />
          That&apos;s where{" "}
          <span className="text-white underline">technology got hold of me</span>
          . PC gaming, mostly — <span>Doom, MAME32, Half-Life, The Sims</span> —
          and somewhere in there I came across programming and thought it was
          magic.{" "}
          <span className="text-white">
            <em>Naturally</em> I wanted to understand the magic, so I enrolled at
            IIE Rosebank College and graduated with a Diploma in IT in Software
            Development at <strong>72%</strong>.
          </span>
          <br />
          <br />
          <span>
            From there I joined the Software Academy internship at{" "}
            <span className="text-white">Tshimologong Digital Precinct</span>,
            sponsored by Samsung, and then moved into frontend work at{" "}
            <span className="text-white">Munch</span> — where I&apos;ve spent the
            last two years on a platform that restaurants actually run their
            business on. Shipping to people whose revenue depends on your code
            being right teaches you a particular kind of care.
          </span>
          <br />
          <br />
          <span className="text-white italic">
            I&apos;m still doing this for the same reason I started: I like
            building things, and I like passing on what I learn to whoever
            follows the same path.
          </span>
        </p>
      </div>
    </Card>
  );
};

export default BackgroundCard;
