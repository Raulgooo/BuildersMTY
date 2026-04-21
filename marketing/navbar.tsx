"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/builderslogo2.svg"
            alt="Buildmancer"
            width={28}
            height={28}
          />
          <span className="text-sm font-semibold tracking-tight">
            Buildmancer
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#como-funciona"
            className="text-[13px] text-text-muted transition-colors hover:text-text"
          >
            Cómo funciona
          </a>
          <a
            href="#proyectos"
            className="text-[13px] text-text-muted transition-colors hover:text-text"
          >
            Proyectos
          </a>
          <Link
            href="/pricing"
            className="text-[13px] text-text-muted transition-colors hover:text-text"
          >
            Precios
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-white/15"
          >
            Comenzar
          </Link>
        </div>

        <button
          className="text-text-muted hover:text-text md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-bg/95 px-6 py-6 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-5">
            <a
              href="#como-funciona"
              className="text-sm text-text-muted hover:text-text"
              onClick={() => setMobileOpen(false)}
            >
              Cómo funciona
            </a>
            <a
              href="#proyectos"
              className="text-sm text-text-muted hover:text-text"
              onClick={() => setMobileOpen(false)}
            >
              Proyectos
            </a>
            <Link
              href="/pricing"
              className="text-sm text-text-muted hover:text-text"
              onClick={() => setMobileOpen(false)}
            >
              Precios
            </Link>
            <Link
              href="/courses"
              className="inline-flex w-fit items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/15"
              onClick={() => setMobileOpen(false)}
            >
              Comenzar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
