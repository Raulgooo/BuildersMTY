import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="flex items-center gap-2.5">
          <Image
            src="/builderslogo2.svg"
            alt="Buildmancer"
            width={20}
            height={20}
          />
          <span className="text-xs text-text-dim">
            Buildmancer © {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex gap-6">
          <Link
            href="/pricing"
            className="text-xs text-text-dim transition-colors hover:text-text-muted"
          >
            Precios
          </Link>
          <Link
            href="/courses"
            className="text-xs text-text-dim transition-colors hover:text-text-muted"
          >
            Proyectos
          </Link>
        </div>
      </div>
    </footer>
  );
}
