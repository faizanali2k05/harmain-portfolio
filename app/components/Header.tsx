import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-display text-lg tracking-wide">
          Harmain Ali
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
          <a href="#work" className="hover:text-white">
            Work
          </a>
          <a href="#workflow" className="hover:text-white">
            Workflow
          </a>
          <a href="#experience" className="hover:text-white">
            Experience
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/90 transition hover:border-white/40 hover:text-white"
        >
          Let&apos;s Connect
        </a>
      </div>
    </header>
  );
}
