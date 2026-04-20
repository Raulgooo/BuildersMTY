"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="w-full px-6 lg:px-10 py-16 lg:py-24 bg-[var(--surface-0)] border-t border-[var(--border-subtle)]"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between gap-12">
        <div className="space-y-6">
          <div className="font-[family-name:var(--font-archivo-black)] text-2xl text-[var(--text-primary)] uppercase tracking-tight">
            BuildersMTY
          </div>
          <div className="space-y-3">
            <p className="text-sm text-[var(--text-secondary)]">
              Fundador: Raúl R. González
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              <a
                href="mailto:raul@buildersmty.com.mx"
                className="text-[var(--red)] hover:text-[var(--red-light)] transition-colors"
              >
                raul@buildersmty.com.mx
              </a>
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              href="https://www.linkedin.com/in/ra%C3%BAl-r-gonz%C3%A1lez-a39a03347/"
              className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--red)] transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/Raulgooo"
              className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--red)] transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-end items-start lg:items-end gap-4">
          <p className="text-[12px] text-[var(--text-ghost)] uppercase tracking-widest">
            Building in public, always.
          </p>
          <p className="text-[12px] text-[var(--text-ghost)]">
            © 2026 BuildersMTY
          </p>
        </div>
      </div>
    </footer>
  );
}
