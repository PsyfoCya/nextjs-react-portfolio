/**
 * Placeholder for the access card while its chunk downloads and its face is
 * painted.
 *
 * Its own module so both the stage and the card itself can show it without
 * importing each other — the stage pulls the card in with `next/dynamic`, so a
 * back-reference would be circular.
 */
const CardSkeleton = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="h-72 w-52 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
  </div>
);

export default CardSkeleton;
