"use client";

export default function Footer() {
  return (
    <footer className="footer surface-lowest">
      <div className="footer-content">
        <p className="label-sm">©2024 BUILDERS MTY // RADICAL ARCHITECT PROTOCOL</p>
        <div className="footer-links">
          <a href="#" className="label-sm">GITHUB_REPO</a>
          <a href="#" className="label-sm">DOCS_CORE</a>
          <a href="#" className="label-sm">TELEGRAM</a>
          <a href="#" className="label-sm">X_COMMUNITY</a>
          <a href="#" className="label-sm">SYSTEM_STATUS</a>
        </div>
      </div>
      <style jsx>{`
        .footer {
          margin-left: 280px; /* Offset for sidebar nav */
          border-top: 1px solid rgba(177, 135, 128, 0.1);
          padding: var(--spacing-6) var(--spacing-8);
        }
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--spacing-4);
        }
        p {
          color: var(--on-surface-variant);
        }
        .footer-links {
          display: flex;
          gap: var(--spacing-6);
        }
        a {
          color: var(--on-surface-variant);
        }
        a:hover {
          color: var(--tertiary);
        }
      `}</style>
    </footer>
  );
}
