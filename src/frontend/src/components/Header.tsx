"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    ["Inicio", "/"],
    ["Cursos", "/courses"],
    ["Eventos", "/#hackathon"],
    ["Contacto", "/#contacto"],
  ];

  return (
    <>
      <nav
        className={`fixed top-0 z-[100] w-full px-6 lg:px-10 py-4 flex justify-between items-center transition-all duration-300 ${
          scrolled || isMenuOpen
            ? "bg-[var(--surface-0)]/95 backdrop-blur-md border-b border-[var(--border-subtle)]"
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/builderslogo2.svg"
            alt="BuildersMTY"
            width={44}
            height={44}
            className="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
          />
          <span className="font-[family-name:var(--font-archivo-black)] text-lg tracking-tight text-[var(--text-primary)] uppercase">
            BuildersMTY
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-[13px] font-medium text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors tracking-wide"
            >
              {label}
            </Link>
          ))}
          <Link href="https://discord.gg/RPqWgsN5H6">
            <button className="bg-[var(--red)] text-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
              Discord
            </button>
          </Link>
          {user ? (
            <>
              <Link
                href="/account"
                className="text-[13px] font-medium text-[var(--text-tertiary)] hover:text-[var(--red)] transition-colors"
              >
                Mi Cuenta
              </Link>
              <button
                onClick={logout}
                className="text-[13px] font-medium text-[var(--text-tertiary)] hover:text-[var(--red)] transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="text-[13px] font-medium text-[var(--red)] hover:text-[var(--red-light)] transition-colors"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-[var(--text-primary)] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-[var(--surface-0)] transition-transform duration-500 lg:hidden flex flex-col items-start justify-center px-10 gap-6 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="stagger">
          {navLinks.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-4xl font-[family-name:var(--font-archivo-black)] uppercase tracking-tight text-[var(--text-primary)] hover:text-[var(--red)] transition-colors py-2"
            >
              {label}
            </Link>
          ))}
        </div>
        {user ? (
          <div className="flex flex-col gap-3 mt-4">
            <Link
              href="/account"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--red)] transition-colors"
            >
              Mi Cuenta
            </Link>
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="text-lg font-medium text-[var(--text-tertiary)] hover:text-[var(--red)] transition-colors text-left"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <Link
            href="/auth/login"
            onClick={() => setIsMenuOpen(false)}
            className="text-lg font-medium text-[var(--red)] mt-4"
          >
            Login
          </Link>
        )}
        <Link
          href="https://discord.gg/RPqWgsN5H6"
          onClick={() => setIsMenuOpen(false)}
          className="mt-8"
        >
          <button className="bg-[var(--red)] text-white px-10 py-4 font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity">
            Unirse a Discord
          </button>
        </Link>
      </div>
    </>
  );
}
