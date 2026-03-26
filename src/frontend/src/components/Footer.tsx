"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contacto" className="w-full px-6 py-20 lg:py-32 flex flex-col lg:flex-row justify-between items-end gap-12 bg-[#0E0E0E] border-t border-[#201F1F] relative z-10">
      <div className="flex flex-col gap-6 w-full lg:w-auto">
        <div className="text-3xl font-black text-[#E5E2E1] font-headline uppercase tracking-tighter">
          Builders MTY
        </div>
        <div className="space-y-4">
          <p className="font-label text-sm uppercase tracking-widest text-[#ebbbb4]">
            Fundador: Raúl R. González
            
          </p>
          <p className="font-label text-sm uppercase tracking-widest text-[#ebbbb4]">
            Conecta conmigo directamente: <a href="mailto:raul@buildersmty.com.mx" className="text-[#ff5540] hover:underline">raul@.buildersmty.com.mx</a>
          </p>
          <div className="flex gap-8">
            <Link href="https://www.linkedin.com/in/ra%C3%BAl-r-gonz%C3%A1lez-a39a03347/" className="font-label text-[10px] uppercase tracking-[0.4em] text-[#E5E2E1] hover:text-[#ff5540] transition-colors">
              Linkedin
            </Link>
            <Link href="https://github.com/Raulgooo" className="font-label text-[10px] uppercase tracking-[0.4em] text-[#E5E2E1] hover:text-[#ff5540] transition-colors">
              Github
            </Link>
          </div>
        </div>
        <p className="font-label text-[10px] uppercase tracking-[0.4em] text-[#ff5540]/60">
          ©2026 Builders MTY
        </p>
      </div>
      
      <div className="hidden lg:block">
        <div className="font-label text-[10px] text-[#ffb4a8]/20 uppercase tracking-[0.8em]">
          Building_In_Public_Always
        </div>
      </div>
    </footer>
  );
}
