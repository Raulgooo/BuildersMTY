"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotifyPage() {
  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-body selection:bg-[#ff5540] selection:text-white min-h-screen terminal-grid flex flex-col items-center justify-center relative overflow-hidden">
      {/* Back Link */}
      <Link 
        href="/" 
        className="fixed top-8 left-8 z-50 font-label text-[10px] text-[#ffb4a8]/40 hover:text-[#ff5540] transition-colors tracking-[0.4em] uppercase flex items-center gap-2 group"
      >
        <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
        BACK_HOME
      </Link>

      {/* Structural Background Decoration */}
      <div className="fixed top-0 right-0 w-1/3 h-full pointer-events-none -z-0 opacity-10 overflow-hidden hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-l from-[#ffb4a8]/20 to-transparent"></div>
        <div className="w-full h-full flex items-center justify-center p-12">
          <div className="w-full h-full border-l border-b border-[#ffb4a8]/20 relative">
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#ffb4a8]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 bg-[#ffb4a8]"></div>
          </div>
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center px-6 py-20 w-full max-w-7xl mx-auto z-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-0 relative">
          {/* Technical Sidebar/Indicator */}
          <div className="hidden md:flex col-span-1 border-r border-[#603e39]/20 pt-4 flex-col gap-32">
            <div className="flex flex-col gap-24">
              <span className="font-label text-[10px] text-[#ffb4a8] rotate-90 origin-left whitespace-nowrap tracking-[0.4em] uppercase">
                SYSTEM_STATUS_PENDING
              </span>
              <span className="font-label text-[10px] text-[#E5E2E1]/30 rotate-90 origin-left whitespace-nowrap tracking-[0.4em] uppercase mt-32">
                REF_ID: BMTY_2024_01
              </span>
            </div>
          </div>

          {/* Content Zone */}
          <div className="col-span-11 md:pl-16 lg:pl-24">
            <header className="mb-16">
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="w-2 h-2 bg-[#ff5540] animate-pulse shadow-[0_0_8px_rgba(255,85,64,0.6)]"></span>
                <span className="font-label text-[10px] tracking-[0.3em] text-[#ffb4a8] uppercase">
                  Queue initialization protocol
                </span>
              </div>
              <h1 className="font-headline text-6xl md:text-[80px] font-black tracking-tighter uppercase leading-[0.85] text-[#E5E2E1] mb-10">
                The arena is <br />
                <span className="text-[#ff5540]">configuring.</span>
              </h1>
              <p className="font-body text-xl md:text-2xl text-[#E5E2E1]/70 max-w-2xl leading-relaxed tracking-tight font-light">
                We are currently reuniting enough competition for you, we are working on bringing cool judges too, we&apos;ll let you know when it is on
                <span className="block-cursor ml-3"></span>
              </p>
            </header>

            {/* Form Section */}
            <section className="max-w-xl">
              <form className="space-y-16" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-10">
                  <div className="relative group">
                    <label className="font-label text-[10px] tracking-[0.3em] text-[#E5E2E1]/40 uppercase mb-3 block group-focus-within:text-[#ffb4a8] transition-colors">
                      01_IDENTIFIER
                    </label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-[#603e39]/40 py-5 font-headline text-2xl text-[#E5E2E1] placeholder:text-[#E5E2E1]/10 transition-all focus:ring-0 focus:border-[#ff5540] outline-none"
                      placeholder="NAME / ALIAS"
                      type="text"
                    />
                  </div>
                  <div className="relative group">
                    <label className="font-label text-[10px] tracking-[0.3em] text-[#E5E2E1]/40 uppercase mb-3 block group-focus-within:text-[#ffb4a8] transition-colors">
                      02_UPLINK_NODE
                    </label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-[#603e39]/40 py-5 font-headline text-2xl text-[#E5E2E1] placeholder:text-[#E5E2E1]/10 transition-all focus:ring-0 focus:border-[#ff5540] outline-none"
                      placeholder="EMAIL_ADDRESS"
                      type="email"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 pt-6">
                  <button
                    className="bg-[#ff5540] text-white font-headline font-bold py-6 px-10 tracking-[0.1em] text-sm hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(255,85,64,0.15)] group"
                    type="submit"
                  >
                    SEND & JOIN DISCORD
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">terminal</span>
                  </button>
                  <button
                    className="border border-[#603e39] text-[#E5E2E1]/60 font-headline font-bold py-6 px-10 tracking-[0.1em] text-sm hover:bg-[#E5E2E1]/5 hover:text-[#E5E2E1] transition-all active:scale-[0.98] uppercase"
                    type="button"
                  >
                    SEND, I&apos;LL JOIN WHEN I&apos;M WORTHY
                  </button>
                </div>
              </form>
            </section>

            {/* Data Visualizer Aesthetic Piece */}
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 border-t border-[#603e39]/10 pt-10">
              {[
                { label: "Active_Nodes", value: "w-2/3", color: "bg-[#ffb4a8]" },
                { label: "Latency_Check", value: "w-full", color: "bg-[#603e39]" },
                { label: "Sync_Status", value: "w-1/2", color: "bg-[#ff5540]" },
                { label: "Encryption_Load", value: "w-3/4", color: "bg-[#603e39]" }
              ].map((stat, i) => (
                <div key={i} className="space-y-3">
                  <div className="font-label text-[9px] uppercase tracking-[0.3em] text-[#E5E2E1]/60">
                    {stat.label}
                  </div>
                  <div className="h-[2px] bg-[#603e39]/20 w-full relative">
                    <div className={`h-full ${stat.color} ${stat.value} absolute top-0 left-0`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#0E0E0E] flex flex-col md:flex-row justify-between items-center px-8 py-10 border-t border-[#201F1F] z-20">
        <div className="font-label text-[10px] uppercase tracking-[0.4em] text-[#666666] mb-6 md:mb-0">
          ©2024 BUILDERS_MTY // ROOT_ACCESS_ONLY
        </div>
        <div className="flex gap-10">
          {[
            ["TERMINAL", "/notify"],
            ["PROTOCOL", "#"],
            ["ENCRYPTED_FEED", "#"]
          ].map(([label, href]) => (
            <Link
              key={label}
              className="font-label text-[10px] uppercase tracking-[0.3em] text-[#666666] hover:text-[#ff5540] transition-colors"
              href={href}
            >
              {label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
