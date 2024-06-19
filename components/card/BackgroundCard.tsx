import Card from "../ui/Card";
import About from "../../sections/About";

const BackgroundCard = () => {
  return (
    <Card className="md:h-full" title="My Background">
      <div>
        <p className="leading-[160%] font-normal text-white/[0.4] text-[16px]">
          I was born in the humble small town in{" "}
          <span className="text-white underline">
            the Free State, called Frankfort
          </span>
          , in my early years I lived with my mother at her aunts homestead in
          Free State. However I than moved to live in Johannesburg South in a
          location called Ennerdale at the age of 3 years.
          <br />
          <span className="text-white underline">it was during this time</span>
          &nbsp; that my fascination with &nbsp;
          <span className="text-white underline">technology</span> &nbsp;
          burrowed deep into my heart. From those formative years, I found
          myself deeply immersed in &nbsp;
          <span>the world of pc gaming (Doom, Mame32, Half-Life and Sims)</span>
          &nbsp;, where my passion for technology began to flourish &nbsp;
          <br />
          As I delved deeper into the realm of technology, I came across
          programming and though it was magic.
          <span className="text-white">
            <em>Naturally</em> I wanted to understand this magic so I enrolled
            in Rosebank College and graduated with at <strong>72%</strong>.
          </span>
          <span>
            Since then I continued to do courses on topics I found interesting
            and got employed at Tsimologong Digital Precint under the
            Software Academy internhip programme sponsored by Samsung and
            further grew as a Software Developer.
          </span>
          <span className="text-white italic">
            I am passionate about technology and just want to spread the
            software love, gaming has shown me in my life to others who will
            follow the path of technology like I did.
          </span>
        </p>
      </div>
    </Card>
  );
};

export default BackgroundCard;
