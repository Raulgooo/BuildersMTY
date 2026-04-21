"use client";

import { useState, useEffect } from "react";

interface Line {
  text: string;
  type: "command" | "pass" | "success" | "info" | "blank";
  delay: number;
}

const SEQUENCE: Line[] = [
  { text: "$ buildmancer test http-server --module 01", type: "command", delay: 0 },
  { text: "  Running tests...", type: "info", delay: 600 },
  { text: "", type: "blank", delay: 1100 },
  { text: "  \u2713 Bind to port 8080", type: "pass", delay: 1400 },
  { text: "  \u2713 Respond with 200 OK", type: "pass", delay: 1900 },
  { text: "  \u2713 Return correct headers", type: "pass", delay: 2400 },
  { text: "  \u2713 Handle GET /files/", type: "pass", delay: 2900 },
  { text: "", type: "blank", delay: 3300 },
  { text: "  All tests passed!", type: "success", delay: 3600 },
];

const CYCLE_MS = 7000;

function lineColor(type: Line["type"]): string {
  switch (type) {
    case "command":
      return "text-text";
    case "pass":
      return "text-success";
    case "success":
      return "font-semibold text-success";
    case "info":
      return "text-text-muted";
    default:
      return "";
  }
}

export function TerminalAnimation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setVisibleCount(0);

    const timers = SEQUENCE.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), SEQUENCE[i].delay + 400),
    );

    const restart = setTimeout(() => setCycle((c) => c + 1), CYCLE_MS);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(restart);
    };
  }, [cycle]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#0a0909] shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 text-[11px] text-text-dim">terminal</span>
      </div>

      {/* Body */}
      <div className="min-h-[200px] p-4 font-mono text-xs leading-5 md:min-h-[240px] md:p-5 md:text-[13px] md:leading-6">
        {SEQUENCE.slice(0, visibleCount).map((line, i) => (
          <div
            key={`${cycle}-${i}`}
            className={`animate-fadeIn ${lineColor(line.type)}`}
          >
            {line.text || "\u00A0"}
          </div>
        ))}
        {visibleCount < SEQUENCE.length && (
          <span className="inline-block h-4 w-[7px] animate-pulse bg-text-dim" />
        )}
      </div>
    </div>
  );
}
