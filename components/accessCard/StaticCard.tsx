import Image from "next/image";

/**
 * The access card as a still image.
 *
 * Shown to anyone who asks for reduced motion — a physics toy that flings
 * itself around is exactly what that setting is meant to suppress — on screens
 * too narrow for the scene, and as the fallback if the card's face fails to
 * paint.
 *
 * Its own module so both the stage and the 3D card can reach it: the stage
 * pulls the card in with `next/dynamic`, so a back-reference would be circular.
 */
const StaticCard = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1226] shadow-2xl">
      <div className="fancy-bg h-3" />
      <div className="flex flex-col items-center gap-3 px-5 py-6">
        <Image
          src="/assets/images/me/psyfo-access-card.png"
          alt="Siyabonga Hadebe"
          width={96}
          height={96}
          sizes="96px"
          className="h-24 w-24 rounded-full object-cover ring-2 ring-white/25"
        />
        <p className="text-center text-lg font-semibold leading-tight text-white">
          Siyabonga Hadebe
        </p>
        <p className="text-center text-xs uppercase tracking-wide text-white/60">
          Frontend Developer
        </p>
      </div>
    </div>
  </div>
);

export default StaticCard;
