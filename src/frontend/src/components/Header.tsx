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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    ["Inicio", "/"],
    ["Cursos", "/#cursos"],
    ["Builders Network", "/buildersnetwork"],
    ["Eventos", "/#hackathon"],
    ["Contacto", "/#contacto"],
  ];

  return (
    <>
      <nav
        className={`fixed top-0 z-[100] w-full px-6 py-4 flex justify-between items-center transition-all duration-300 ${
          scrolled || isMenuOpen
            ? "bg-[#131313]/95 backdrop-blur-md border-b border-[#ffb4a8]/10"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-xl font-bold tracking-tighter text-[#ff5540] font-headline uppercase group-hover:brightness-110 transition-all">
              BUILDERS MTY
            </div>
            <Image
              src="/builderslogo.svg"
              alt="Builders MTY Logo"
              width={70}
              height={70}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(([label, href]) => (
            <Link
              key={label}
              className="font-headline uppercase tracking-widest text-[11px] text-[#E5E2E1] opacity-60 hover:opacity-100 hover:text-[#ffb4a8] transition-all"
              href={href}
            >
              {label}
            </Link>
          ))}
          <Link href="https://discord.gg/RPqWgsN5H6">
            <button className="bg-[#ff5540] text-white px-5 py-2 font-headline text-[10px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-transform hover:brightness-110">
              DISCORD
            </button>
          </Link>
          {user ? (
            <button
              onClick={logout}
              className="font-headline uppercase tracking-widest text-[11px] text-[#E5E2E1] opacity-40 hover:text-[#ff5540] hover:opacity-100 transition-all"
            >
              Cerrar Sesión
            </button>
          ) : (
            <Link
              href="/auth/courses"
              className="font-headline uppercase tracking-widest text-[11px] text-[#ff5540] opacity-80 hover:opacity-100 transition-all"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-[#ff5540] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-[#131313] transition-transform duration-500 lg:hidden flex flex-col items-center justify-center gap-8 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full ghost-grid opacity-10 pointer-events-none"></div>
        {navLinks.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            onClick={() => setIsMenuOpen(false)}
            className="text-4xl font-headline font-black uppercase tracking-tighter text-[#E5E2E1] hover:text-[#ff5540] transition-colors"
          >
            {label}
          </Link>
        ))}
        {user ? (
          <button
            onClick={() => { logout(); setIsMenuOpen(false); }}
            className="font-headline uppercase tracking-widest text-[11px] text-[#E5E2E1] opacity-40 hover:text-[#ff5540] hover:opacity-100 transition-all"
          >
            Cerrar Sesión
          </button>
        ) : (
          <Link
            href="/auth/courses"
            onClick={() => setIsMenuOpen(false)}
            className="font-headline uppercase tracking-widest text-[11px] text-[#ff5540] opacity-80 hover:opacity-100 transition-all"
          >
            Login
          </Link>
        )}
        <Link href="https://discord.gg/RPqWgsN5H6" onClick={() => setIsMenuOpen(false)}>
          <button className="bg-[#ff5540] text-white px-10 py-5 font-headline font-bold uppercase tracking-[0.3em] active:scale-95 transition-transform mt-6">
            UNIRSE A DISCORD
          </button>
        </Link>
        
        <div className="absolute bottom-12 flex flex-col items-center gap-4">
          <div className="font-label text-[10px] text-[#ffb4a8]/40 uppercase tracking-[0.5em]">
            Protocol_V1.0_Mobile
          </div>
          <div className="w-12 h-[1px] bg-[#603e39]/30"></div>
        </div>
      </div>
    </>
  );
}
