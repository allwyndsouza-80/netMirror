import { useState } from "react";

export default function AddProfileCard({ onManage }: { onManage: () => void }) {
    const [hovered, setHovered] = useState(false);
  
    return (
      <div
        className="flex flex-col items-center gap-4 cursor-pointer group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onManage}
      >
        <div
          className="w-28 h-28 md:w-36 md:h-36 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            border: `2px dashed ${hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"}`,
            background: hovered ? "rgba(255,255,255,0.05)" : "transparent",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        >
          <svg
            className="transition-all duration-300"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke={hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span
          className="text-sm font-medium transition-colors duration-200"
          style={{ color: hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}
        >
          Add Profile
        </span>
      </div>
    );
  }