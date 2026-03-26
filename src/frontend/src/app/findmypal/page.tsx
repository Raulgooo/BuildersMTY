"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FindMyPalPage() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const profiles = [
    {
      name: "Diego 'Null' Garza",
      role: "Systems Architect // Low-Level Dev",
      desc: "Obsessed with performance and memory safety. Built a custom L2 sequencer for high-speed trading.",
      level: "WINNER_CHAMPION",
      tier: 1,
      tags: ["Rust", "Solana", "L2"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdaJdCczcQkklxxzgLFVRWkA5oJyPYu3rtP6WmBj1chjRPmPOgEVBhrIwXsfvn-Q0UAhKxrOYlveL8VgWCW0oljYYIGu0Eur0us8RuqRp-uYdSbit80VKcKhJkBMAQvZGWgYO5YxVcitfg80TroJWZZhCDD5mHDL2UybpB-1vcrF6tlXhNtBb3iQgz4Ad5KkHK-p0SV_WaxeDMdkfpITuIVRTqt-sghFqniEOVEAviVgiVVWPLbx85Rw6-zmdWwgZUiaQLx-imaQXK",
      heatmap: [100, 100, 80, 100]
    },
    {
      name: 'Alex "Rax" Rivera',
      role: "Full-stack Architect // Rust Enthusiast",
      desc: "Specializing in distributed systems and high-throughput zero-knowledge protocols. Winner of EthMexico '23.",
      level: "WINNER_CHAMPION",
      tier: 1,
      tags: ["Rust", "ZKP", "Go"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-ncYdB_n8nFigcTDKC744d32Uyn1k4hAGrMdLY41l5fT82CLPsqrrcObV1KWjerXfPTuyFNr7EAJ6YumwlBmfS9wuycAYGsTW4Kqu-1AchQj5ArIb7_nO_STV0eBZ22ia5?w=1280",
      heatmap: [100, 80, 90, 100]
    },
    {
      name: "Mariana Sanchez",
      role: "UX Engineer // React Expert",
      desc: "Bridging the gap between complex backend logic and intuitive UI/UX. Worked on 4+ production dApps.",
      level: "ELITE",
      tier: 2,
      tags: ["React", "Three.js", "Lead"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdaJdCczcQkklxxzgLFVRWkA5oJyPYu3rtP6WmBj1chjRPmPOgEVBhrIwXsfvn-Q0UAhKxrOYlveL8VgWCW0oljYYIGu0Eur0us8RuqRp-uYdSbit80VKcKhJkBMAQvZGWgYO5YxVcitfg80TroJWZZhCDD5mHDL2UybpB-1vcrF6tlXhNtBb3iQgz4Ad5KkHK-p0SV_WaxeDMdkfpITuIVRTqt-sghFqniEOVEAviVgiVVWPLbx85Rw6-zmdWwgZUiaQLx-imaQXK", // Reuse or placeholder
      heatmap: [40, 80, 60, 90]
    },
    {
      name: "Roberto Beto Valdes",
      role: "AI Researcher // PyTorch Dev",
      desc: "Developing efficient LLM fine-tuning techniques for edge devices. Contributor to several open-source ML repos.",
      level: "ELITE",
      tier: 2,
      tags: ["PyTorch", "Python", "ML"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-ncYdB_n8nFigcTDKC744d32Uyn1k4hAGrMdLY41l5fT82CLPsqrrcObV1KWjerXfPTuyFNr7EAJ6YumwlBmfS9wuycAYGsTW4Kqu-1AchQj5ArIb7_nO_STV0eBZ22ia5?w=1280", // Reuse or placeholder
      heatmap: [30, 70, 50, 80]
    },
    {
      name: "Luis Herrera",
      role: "CS Student // Learning Go",
      desc: "Curious about backend scalability and distributed databases. Exploring the Go ecosystem.",
      level: "BUILDER",
      tier: 3,
      tags: ["Go", "Docker"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-ncYdB_n8nFigcTDKC744d32Uyn1k4hAGrMdLY41l5fT82CLPsqrrcObV1KWjerXfPTuyFNr7EAJ6YumwlBmfS9wuycAYGsTW4Kqu-1AchQj5ArIb7_nO_STV0eBZ22ia5?w=512",
      heatmap: [20, 10, 30, 20]
    },
    {
      name: "Sofia Paredes",
      role: "Data Scientist // Pythonista",
      desc: "Working on predictive modeling for energy consumption. Interested in building data visualization tools.",
      level: "VERIFIED_PARTICIPANT",
      tier: 3,
      tags: ["Python", "Pandas"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-ncYdB_n8nFigcTDKC744d32Uyn1k4hAGrMdLY41l5fT82CLPsqrrcObV1KWjerXfPTuyFNr7EAJ6YumwlBmfS9wuycAYGsTW4Kqu-1AchQj5ArIb7_nO_STV0eBZ22ia5?w=512",
      heatmap: [40, 30, 50, 40]
    }
  ];

  return (
    <div className="bg-[#131313] text-[#E5E2E1] font-body selection:bg-[#ff5540] selection:text-white min-h-screen">
      {/* Top Navigation */}
      <nav
        className={`fixed top-0 z-50 w-full px-6 py-4 flex justify-between items-center transition-all duration-300 ${
          scrolled ? "bg-[#131313]/90 backdrop-blur-md border-b border-[#ffb4a8]/10" : "bg-transparent"
        }`}
      >
        <div className="text-xl font-bold tracking-tighter text-[#ff5540] font-headline uppercase">
          RADICAL_ARCHITECT
        </div>
        <div className="hidden lg:flex items-center gap-10">
          {[
            ["MISSION", "/#mission"],
            ["FINDMYPAL", "/findmypal"],
            ["MANIFESTO", "/manifesto"],
            ["EVENTS", "/#hackathon"],
            ["TOOLS", "#"],
            ["TERMINAL", "/notify"],
          ].map(([label, href]) => (
            <Link
              key={label}
              className="font-headline uppercase tracking-widest text-[11px] text-[#E5E2E1] opacity-70 hover:opacity-100 hover:text-[#ffb4a8] transition-all"
              href={href}
            >
              {label}
            </Link>
          ))}
        </div>
        <button className="bg-[#ff5540] text-white px-5 py-2 font-headline text-[10px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-transform">
          JOIN_NETWORK
        </button>
      </nav>

      <main className="ghost-grid pt-32 pb-24 border-x border-[#ffb4a8]/10 max-w-[1440px] mx-auto min-h-screen">
        <div className="px-6 lg:px-12">
          {/* Header Section */}
          <header className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20 border-l-[4px] border-[#ff5540] pl-8 py-2">
            <div>
              <h1 className="text-6xl lg:text-[80px] font-headline font-black tracking-tighter uppercase leading-none mb-6">
                FIND_MY<span className="text-[#ff5540]">_PAL</span>
              </h1>
              <div className="flex gap-4">
                <span className="bg-[#201f1f] border border-[#603e39]/20 px-4 py-1 font-label text-[10px] text-[#ebbbb4] tracking-widest uppercase">
                  74 Registered
                </span>
                <span className="bg-[#ff5540]/5 border border-[#ff5540]/20 px-4 py-1 font-label text-[10px] text-[#ff5540] tracking-widest uppercase">
                  12 Elite Builders Verified
                </span>
              </div>
            </div>
            <div className="w-full lg:w-96 flex flex-col gap-3">
              <label className="font-label text-[10px] uppercase tracking-widest text-[#E5E2E1]/40">
                Global Network Search
              </label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search by stack or repo..."
                  className="w-full bg-[#201f1f] border border-[#603e39] py-4 px-6 font-body text-sm text-[#E5E2E1] placeholder:text-[#6b7280] focus:ring-0 focus:border-[#ff5540] transition-all outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#ff5540] text-lg">
                  search
                </span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-3 space-y-12 sticky top-32">
              {[
                {
                  id: "01",
                  title: "Stack",
                  options: ["Low-level", "AI / ML", "Web Architecture"]
                },
                {
                  id: "02",
                  title: "University",
                  options: ["UANL", "ITESM", "UDEM", "Remote"]
                },
                {
                  id: "03",
                  title: "Status",
                  options: ["Open for Projects", "Building", "Hiring"]
                }
              ].map((section) => (
                <div key={section.id} className="space-y-6">
                  <h3 className="font-label text-[10px] text-[#ffb4a8] tracking-[0.3em] uppercase border-b border-[#603e39]/20 pb-4">
                    {section.id} // {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.options.map((opt, i) => (
                      <label key={opt} className="flex items-center gap-4 group cursor-pointer">
                        <div className={`w-4 h-4 border border-[#603e39] flex items-center justify-center transition-all ${i === 0 && section.id === "01" ? "bg-[#ff5540] border-[#ff5540]" : "group-hover:border-[#ff5540]"}`}>
                          {i === 0 && section.id === "01" && (
                            <span className="material-symbols-outlined text-[10px] text-white font-black">check</span>
                          )}
                        </div>
                        <span className={`font-headline text-sm tracking-tight transition-all ${i === 0 && section.id === "01" ? "text-[#ffb4a8]" : "text-[#E5E2E1]/60 group-hover:text-[#E5E2E1]"}`}>
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </aside>

            {/* Talent Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
              {profiles.map((p, i) => (
                <div
                  key={i}
                  className={`relative bg-[#201f1f] border p-8 flex flex-col group transition-all duration-300 hover:-translate-y-2 ${
                    p.tier === 1 
                    ? "border-[#FFD700]/50 glow-gold shadow-[0_0_30px_rgba(255,215,0,0.1)] lg:scale-[1.02]" 
                    : p.tier === 2 
                    ? "border-[#ff5540]/30 hover:border-[#ff5540]/60" 
                    : "border-[#603e39]/30 hover:border-[#ffb4a8]/30"
                  }`}
                >
                  {p.tier === 1 && (
                    <div className="absolute -top-3 -right-3 bg-[#FFD700] text-black font-label text-[9px] px-3 py-1 font-black uppercase tracking-widest shadow-xl z-20">
                      CHAMPION
                    </div>
                  )}
                  
                  <div className="flex gap-6 mb-8 items-start">
                    <div className={`w-20 h-20 shrink-0 border overflow-hidden relative ${p.tier === 1 ? "border-[#FFD700]/50 shadow-[0_0_15px_rgba(255,215,0,0.2)]" : "border-[#603e39]/40"}`}>
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        className={`object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110 ${p.tier === 1 ? "contrast-125" : ""}`}
                      />
                    </div>
                    <div className="flex-grow pt-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-headline font-bold text-xl uppercase tracking-tighter text-[#E5E2E1]">
                          {p.name}
                        </h4>
                        <span className={`material-symbols-outlined text-xl ${p.tier === 1 ? "text-[#FFD700] animate-pulse" : p.tier === 2 ? "text-[#ff5540]" : "text-[#ffb4a8]/30"}`}>
                          {p.tier === 1 ? "workspace_premium" : "verified"}
                        </span>
                      </div>
                      <p className={`font-label text-[10px] tracking-[0.3em] mt-1 uppercase ${p.tier === 1 ? "text-[#FFD700]" : "text-[#ffb4a8]"}`}>
                        {p.level}
                      </p>
                    </div>
                  </div>

                  <h5 className="font-label text-[11px] font-bold text-[#ebbbb4] uppercase tracking-[0.2em] mb-4">
                    {p.role}
                  </h5>
                  <p className="text-sm font-body font-light text-[#ebbbb4] leading-relaxed mb-8 flex-grow">
                    {p.desc}
                  </p>

                  <div className="flex flex-col gap-6 pt-6 border-t border-[#603e39]/20">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {p.heatmap.map((op, idx) => (
                          <div
                            key={idx}
                            className={`w-4 h-4 rounded-[1px] ${p.tier === 1 ? "bg-[#FFD700]" : "bg-[#ff5540]"}`}
                            style={{ opacity: op / 100 }}
                          ></div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {p.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-label px-2 py-0.5 border border-[#603e39]/40 text-[#E5E2E1]/40 uppercase tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="py-3 border border-[#603e39]/40 font-headline text-[10px] font-bold uppercase tracking-widest hover:bg-[#ff5540]/5 transition-all active:scale-[0.97]">
                        VIEW_COMMITS
                      </button>
                      <button className={`py-3 font-headline text-[10px] font-bold uppercase tracking-widest transition-all active:scale-[0.97] ${p.tier === 1 ? "bg-[#FFD700] text-black" : "bg-[#ff5540] text-white"}`}>
                        ENCRYPTED_PING
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-20 lg:py-32 flex flex-col lg:flex-row justify-between items-end gap-12 bg-[#0E0E0E] border-t border-[#201F1F]">
        <div className="flex flex-col gap-6">
          <div className="text-3xl font-black text-[#E5E2E1] font-headline uppercase tracking-tighter">
            RADICAL ARCHITECT
          </div>
          <p className="font-label text-[10px] uppercase tracking-[0.4em] text-[#ff5540]/60">
            ©2024 RADICAL ARCHITECT. ALL SYSTEMS OPERATIONAL.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-6 justify-end max-w-3xl">
          {[
            "GITHUB_REPO",
            "DOCS_CORE",
            "TELEGRAM_ENCRYPTED",
            "X_COMMUNITY",
            "SYSTEM_STATUS"
          ].map(link => (
            <Link
              key={link}
              className="font-label text-[11px] uppercase tracking-[0.3em] text-[#E5E2E1]/30 hover:text-[#ff5540] transition-colors"
              href="#"
            >
              {link}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
