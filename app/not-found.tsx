import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const NotFound = () => (
  <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-6 px-5 lg:px-8">
    <p className="font-pixel text-lg uppercase text-secondary-foreground">404</p>
    <h1 className="font-oswald text-5xl leading-[105%] text-primary-foreground lg:text-7xl">
      Nothing <span className="italic">here</span>
    </h1>
    <p className="max-w-lg text-[16px] leading-[175%] text-secondary-foreground">
      That page doesn&apos;t exist — it may have moved, or the link may be
      wrong.
    </p>
    <div className="flex flex-wrap gap-3">
      <Link
        href="/"
        className="link rounded-full border border-border bg-primary-background px-5 py-2.5 text-primary-foreground transition-colors duration-200 hover:bg-white/[0.1]"
      >
        Home
      </Link>
      <Link
        href="/work"
        className="link rounded-full border border-border bg-primary-background px-5 py-2.5 text-primary-foreground transition-colors duration-200 hover:bg-white/[0.1]"
      >
        Case studies
      </Link>
    </div>
  </main>
);

export default NotFound;
