import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-8 md:px-10">
      <div className="label mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} — {site.role}
        </p>
        <div className="flex gap-6">
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-cyan">
            почта
          </a>
          <a href={site.telegram} className="transition-colors hover:text-cyan">
            telegram
          </a>
          <a href="#top" className="transition-colors hover:text-cyan">
            наверх
          </a>
        </div>
      </div>
    </footer>
  );
}
