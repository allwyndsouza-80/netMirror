import { useState } from "react";
import type { Profile } from "../../types/profile";

interface ProfileCardProps {
    profile: Profile;
    index: number;
    isManaging: boolean;
    onSelect: (profile: Profile) => void;
    onDelete: (id: string) => void;
    visible: boolean;
  }
  
  export default function ProfileCard({ profile, index, isManaging, onSelect, onDelete, visible }: ProfileCardProps) {
    const [hovered, setHovered] = useState(false);
    const [deleting, setDeleting] = useState(false);
  
    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      setDeleting(true);
      setTimeout(() => onDelete(profile.id), 300);
    };
  
    return (
      <div
        className="flex flex-col items-center gap-4 cursor-pointer"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms, scale 0.3s ease`,
          scale: deleting ? "0" : "1",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => !isManaging && onSelect(profile)}
      >
        {/* Avatar container */}
        <div className="relative">
          {/* Glow effect */}
          {hovered && !isManaging && (
            <div
              className="absolute inset-0 rounded-xl blur-xl opacity-50 pointer-events-none"
              style={{ background: profile.avatarGradient, transform: "scale(1.1)" }}
            />
          )}
  
          {/* Main avatar */}
          <div
            className="relative w-28 h-28 md:w-36 md:h-36 rounded-xl flex items-center justify-center text-3xl md:text-4xl transition-all duration-300 select-none"
            style={{
              background: profile.avatarGradient,
              transform: hovered && !isManaging ? "scale(1.06)" : isManaging ? "scale(0.96)" : "scale(1)",
              boxShadow:
                hovered && !isManaging
                  ? `0 16px 48px ${profile.avatarColor}60, 0 4px 16px rgba(0,0,0,0.6)`
                  : "0 4px 16px rgba(0,0,0,0.5)",
              border:
                hovered && !isManaging
                  ? `2px solid ${profile.avatarColor}80`
                  : "2px solid transparent",
            }}
          >
            {profile.avatarIcon}
  
            {/* Kids badge */}
            {profile.isKids && (
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap"
                style={{ background: profile.avatarColor, color: "white", fontSize: "10px", letterSpacing: "0.05em" }}
              >
                KIDS
              </div>
            )}
  
            {/* Manage mode overlay */}
            {isManaging && (
              <div
                className="absolute inset-0 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
            )}
          </div>
  
          {/* Delete button */}
          {isManaging && (
            <button
              onClick={handleDelete}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
              style={{ background: "#ef4444", border: "2px solid #1a1a1a" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
  
          {/* Maturity rating chip */}
          <div
            className="absolute -top-2 -left-2 px-1.5 py-0.5 rounded text-white font-bold"
            style={{
              background: profile.maturityRating === "18+" ? "#ef4444" : profile.maturityRating === "13+" ? "#f97316" : "#22c55e",
              fontSize: "9px",
              letterSpacing: "0.03em",
              opacity: hovered || isManaging ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          >
            {profile.maturityRating}
          </div>
        </div>
  
        {/* Name */}
        <span
          className="text-sm md:text-base font-medium transition-colors duration-200"
          style={{
            color: hovered && !isManaging ? "white" : "rgba(255,255,255,0.65)",
            letterSpacing: "0.02em",
          }}
        >
          {profile.name}
        </span>
      </div>
    );
  }
