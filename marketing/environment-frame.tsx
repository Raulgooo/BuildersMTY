import { WorkspacePreview } from "./workspace-preview";

/**
 * The real workspace React component, miniaturized and framed as a display
 * seen slightly off-axis. Straightens on hover. CSS-only 3D transform.
 */
export function EnvironmentFrame() {
  return (
    <div
      className="group relative"
      style={{ perspective: "1800px", perspectiveOrigin: "50% 40%" }}
    >
      {/* Glow pad beneath the display */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 -bottom-6 h-16 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(255,0,0,0.12) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative [transform:rotateY(-11deg)_rotateX(5deg)] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Bezel */}
        <div className="relative rounded-[10px] border border-border bg-surface p-[6px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.75),0_25px_50px_-15px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.04)]">
          {/* Top chrome strip */}
          <div className="flex h-6 items-center justify-between px-3">
            <div className="flex items-center gap-1.5">
              <span className="h-[5px] w-[5px] rounded-full bg-border" />
              <span className="h-[5px] w-[5px] rounded-full bg-border" />
              <span className="h-[5px] w-[5px] rounded-full bg-border" />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-dim">
              buildmancer · env
            </span>
            <span className="h-[5px] w-[5px] rounded-full bg-primary/50" />
          </div>

          {/* Screen — live workspace preview */}
          <div className="relative overflow-hidden rounded-[4px] bg-bg">
            <div
              className="w-full"
              style={{ aspectRatio: "16 / 9" }}
            >
              <WorkspacePreview />
            </div>

            {/* Soft vignette — depth without glassmorphism */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 35%, transparent 80%, rgba(0,0,0,0.25) 100%)",
              }}
            />
            {/* Off-axis specular sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "linear-gradient(115deg, transparent 0%, transparent 42%, rgba(255,255,255,0.035) 50%, transparent 58%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* Monitor plinth */}
        <div
          aria-hidden
          className="mx-auto -mt-px flex flex-col items-center"
          style={{ transform: "translateZ(-12px)" }}
        >
          <div className="h-3 w-[28%] border-x border-b border-border bg-surface" />
          <div className="h-[2px] w-[40%] bg-border" />
        </div>
      </div>
    </div>
  );
}
