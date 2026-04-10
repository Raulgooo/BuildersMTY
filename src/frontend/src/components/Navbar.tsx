"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { label: 'MISSION', href: '/' },
    { label: 'FINDMYPAL', href: '/findmypal' },
    { label: 'MANIFESTO', href: '/manifesto' },
    { label: 'EVENTS', href: '#events' },
    { label: 'TERMINAL', href: '/notify' },
    { label: 'OAUTH', href: '/auth/login' }
  ];

  return (
    <nav className="navbar surface-low">
      <div className="nav-brand">
        <span className="label-sm" style={{ color: 'var(--primary)' }}>SYSTEM_HUD</span>
      </div>
      <ul className="nav-links">
        {links.map(link => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
          return (
            <li key={link.label} className={isActive ? 'active' : ''}>
              <Link href={link.href} className="nav-link label-sm">
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <style jsx>{`
        .navbar {
          width: 280px;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          border-right: 1px solid rgba(177, 135, 128, 0.1);
          display: flex;
          flex-direction: column;
          padding: var(--spacing-8) 0;
        }
        .nav-brand {
          padding: 0 var(--spacing-6) var(--spacing-8);
          border-bottom: 1px solid rgba(177, 135, 128, 0.1);
          margin-bottom: var(--spacing-8);
        }
        .nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }
        li {
          position: relative;
        }
        li.active {
          background: var(--surface-container-high);
        }
        li.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--primary);
        }
        .nav-link {
          display: block;
          padding: var(--spacing-3) var(--spacing-6);
          color: var(--on-surface-variant);
        }
        li.active .nav-link {
          color: var(--on-surface);
        }
        .nav-link:hover {
          color: var(--primary);
          background: rgba(177, 135, 128, 0.05);
        }
      `}</style>
    </nav>
  );
}
