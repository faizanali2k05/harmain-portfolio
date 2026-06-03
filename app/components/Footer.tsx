export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-white/80">Harmain Ali</p>
        <p>Direct Response Video Editor • Performance Marketing Creatives</p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
