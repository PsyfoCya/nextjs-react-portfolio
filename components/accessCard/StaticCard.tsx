/**
 * The access card as flat markup.
 *
 * Shown to anyone who asks for reduced motion — a physics toy that flings
 * itself around is exactly what that setting is meant to suppress — on screens
 * too narrow for the scene, and as the fallback if the card's face fails to
 * paint. It mirrors the printed front, so the fallback and the 3D card do not
 * drift apart.
 *
 * Its own module so both the stage and the 3D card can reach it: the stage
 * pulls the card in with `next/dynamic`, so a back-reference would be circular.
 */
const StaticCard = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div
      className="w-[15rem] overflow-hidden rounded-[1.3rem] border border-white/10 shadow-2xl"
      style={{ aspectRatio: "1 / 1.586" }}
    >
      <div className="fancy-bg h-[10%]" />

      <div className="flex h-[90%] flex-col justify-between bg-[#0d1226] px-5 py-5">
        <div className="flex flex-col gap-0.5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-white/50">
            shadebe.dev
          </p>
          <p className="text-[0.6rem] uppercase tracking-wide text-white/30">
            Staff credential
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold uppercase leading-tight text-white">
            Siyabonga Hadebe
          </p>
          <div className="fancy-bg h-[3px] w-16" />
          <p className="text-xs text-white/60">Frontend Developer</p>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[0.55rem] uppercase tracking-wide text-white/30">
              Location
            </span>
            <span className="text-[0.7rem] text-white/70">
              Johannesburg · ZA
            </span>
          </div>
          {/* Stand-in for the printed barcode. */}
          <div
            aria-hidden
            className="h-6 w-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.8) 0 2px, transparent 2px 5px)",
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default StaticCard;
