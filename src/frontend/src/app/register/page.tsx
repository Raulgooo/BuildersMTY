"use client";

import { useEffect } from "react";

export default function RegisterPage() {
  useEffect(() => {
    // Redirect to Discord join link after a short delay
    const timer = setTimeout(() => {
      window.location.href = "https://discord.gg/buildersmty"; // Placeholder Discord link
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="redirect-page flex items-center justify-center min-h-[60vh]">
      <div className="terminal-box surface-container ghost-border p-12 text-center max-w-lg">
        <h1 className="label-sm text-primary mb-4 animate-pulse">INITIATING_DISCORD_PROTOCOL...</h1>
        <div className="terminal-loader mb-6">
          <div className="bar"></div>
        </div>
        <p className="body-md text-on-surface-variant">
          Preparing your entry into the high-density intelligence network. 
          Redirecting to BUILDERS MTY Discord...
        </p>
      </div>

      <style jsx>{`
        .redirect-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
        }
        .terminal-box {
          padding: var(--spacing-12);
          text-align: center;
          max-width: 32rem;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        .terminal-loader {
          height: 4px;
          background: var(--surface-container-low);
          position: relative;
          overflow: hidden;
        }
        .bar {
          position: absolute;
          left: -100%;
          height: 100%;
          width: 50%;
          background: var(--primary);
          animation: slide 2s linear infinite;
        }
        @keyframes slide {
          0% { left: -50%; }
          100% { left: 100%; }
        }
        .mb-4 { margin-bottom: var(--spacing-4); }
        .mb-6 { margin-bottom: var(--spacing-6); }
      `}</style>
    </div>
  );
}
