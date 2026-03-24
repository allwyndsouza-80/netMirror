import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { headerItems } from "../utils/headerItems";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [headerIndex, setHeaderIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  // ── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close dropdown on outside click ─────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // ── Logout handler ───────────────────────────────────────────────────────
  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--bg)] shadow-xl shadow-black/40"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-12 h-14 md:h-16">
        {/* Logo */}
        <div className="flex items-center gap-6 md:gap-8">
          <span
            className="text-[#e50914] font-black text-xl md:text-2xl tracking-tight cursor-pointer select-none"
            style={{ letterSpacing: "-0.03em", fontVariant: "small-caps" }}
          >
            NETMIRROR
          </span>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-5">
            {headerItems.map((item, i) => (
              <button
              onClick={() => {
                navigate(item.url)
                setHeaderIndex(i)
              }}
                key={item.id}
                className={`text-sm transition-colors duration-150 ${
                  headerIndex === i
                    ? "text-[var(--text-h)] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-h)]"
                }`}
              >
                {item?.name}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[var(--text-h)] flex items-center gap-1 text-sm"
          >
            {headerItems[headerIndex]?.name}
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search */}
          <button className="text-[var(--text-h)] hover:text-white transition-colors duration-150">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>

          {/* Notifications */}
          <button className="text-[var(--text-h)] hover:text-white transition-colors duration-150 hidden sm:block">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          </button>

          {/* Avatar + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 cursor-pointer group focus:outline-none"
            >
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-md bg-gradient-to-br from-[#e50914] to-[#b20710] flex items-center justify-center text-white text-xs font-bold transition-opacity duration-150 group-hover:opacity-85">
                {user?.initials ?? "U"}
              </div>
              <svg
                className={`w-4 h-4 fill-current text-[var(--text-h)] transition-transform duration-200 hidden sm:block ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden z-50"
                style={{
                  background: "rgba(20,20,20,0.97)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.7)",
                  backdropFilter: "blur(16px)",
                  animation: "dropIn 0.18s cubic-bezier(0.16,1,0.3,1) forwards",
                }}
              >
                {/* User info */}
                <div
                  className="px-4 py-3.5 flex items-center gap-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#e50914] to-[#b20710] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {user?.initials ?? "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-semibold truncate">
                      {user?.name ?? "Guest"}
                    </p>
                    <p
                      className="text-xs truncate"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {user?.email ?? ""}
                    </p>
                  </div>
                </div>

                {/* Menu items */}
                <div className="py-1.5">
                  <DropdownItem
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    }
                    label="Switch Profile"
                    onClick={() => { setDropdownOpen(false); navigate("/profiles"); }}
                  />
                  <DropdownItem
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                      </svg>
                    }
                    label="Account Settings"
                    onClick={() => setDropdownOpen(false)}
                  />
                </div>

                {/* Logout */}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="py-1.5">
                  <DropdownItem
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                    }
                    label="Sign Out"
                    onClick={handleLogout}
                    danger
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--bg)]/95 backdrop-blur-sm border-t border-white/10 px-6 py-4 flex flex-col gap-3">
          {headerItems.map((item, i) => (
            <button onClick={()=>{
              setHeaderIndex(i)
              navigate(item.url)
              setMenuOpen(false)
            }} key={item?.id} className="text-[var(--text)] text-sm text-left hover:text-white">
              {item?.name}
            </button>
          ))}
          {/* Mobile logout */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="pt-3 mt-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 text-sm transition-colors duration-150 w-full"
              style={{ color: "rgba(229,9,20,0.8)" }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </nav>
  );
}

// ─── Dropdown Item ────────────────────────────────────────────────────────────

interface DropdownItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}

function DropdownItem({ icon, label, onClick, danger = false }: DropdownItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 focus:outline-none"
      style={{
        color: danger
          ? hovered ? "#e50914" : "rgba(229,9,20,0.7)"
          : hovered ? "white" : "rgba(255,255,255,0.65)",
        background: hovered
          ? danger ? "rgba(229,9,20,0.08)" : "rgba(255,255,255,0.05)"
          : "transparent",
      }}
    >
      <span className="w-4 h-4 flex-shrink-0">{icon}</span>
      {label}
    </button>
  );
}