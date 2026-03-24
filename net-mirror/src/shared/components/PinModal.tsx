// ─── PIN Modal ────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";
import type { Profile } from "../../types/profile";

interface PinModalProps {
    profile: Profile;
    onSuccess: (profile: Profile) => void;
    onCancel: () => void;
  }
  
  export default function PinModal({ profile, onSuccess, onCancel }: PinModalProps) {
    const [pin, setPin] = useState<string[]>(["", "", "", ""]);
    const [error, setError] = useState(false);
    const [shaking, setShaking] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
    useEffect(() => {
      inputRefs.current[0]?.focus();
    }, []);
  
    const handleInput = (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;
      const newPin = [...pin];
      newPin[index] = value.slice(-1);
      setPin(newPin);
      setError(false);
  
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
  
      if (newPin.every((d) => d !== "") && newPin.join("").length === 4) {
        setTimeout(() => {
          if (newPin.join("") === "1234") {
            onSuccess(profile);
          } else {
            setShaking(true);
            setError(true);
            setTimeout(() => {
              setPin(["", "", "", ""]);
              setShaking(false);
              inputRefs.current[0]?.focus();
            }, 600);
          }
        }, 120);
      }
    };
  
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !pin[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };
  
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      >
        <div
          className="relative w-full max-w-sm mx-4 rounded-2xl overflow-hidden"
          style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Top accent */}
          <div className="h-1 w-full" style={{ background: profile.avatarGradient }} />
  
          <div className="px-8 py-10 text-center">
            {/* Avatar */}
            <div
              className="w-16 h-16 rounded-xl mx-auto mb-5 flex items-center justify-center text-2xl"
              style={{ background: profile.avatarGradient, boxShadow: `0 8px 32px ${profile.avatarColor}40` }}
            >
              {profile.avatarIcon}
            </div>
  
            <h2 className="text-white text-xl font-semibold mb-1">Profile Lock</h2>
            <p className="text-gray-400 text-sm mb-8">
              Enter PIN for <span className="text-white font-medium">{profile.name}</span>
            </p>
  
            {/* PIN inputs */}
            <div
              className={`flex gap-3 justify-center mb-6 ${shaking ? "animate-shake" : ""}`}
              style={
                shaking
                  ? { animation: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both" }
                  : {}
              }
            >
              {pin.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInput(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-14 h-14 text-center text-2xl font-bold rounded-xl outline-none transition-all duration-200"
                  style={{
                    background: error ? "rgba(239,68,68,0.15)" : digit ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
                    border: error
                      ? "1.5px solid rgba(239,68,68,0.6)"
                      : digit
                      ? `1.5px solid ${profile.avatarColor}80`
                      : "1.5px solid rgba(255,255,255,0.1)",
                    color: "white",
                    caretColor: profile.avatarColor,
                  }}
                />
              ))}
            </div>
  
            {error && (
              <p className="text-red-400 text-xs mb-4 animate-fade-in">
                Incorrect PIN. Try again. (hint: 1234)
              </p>
            )}
  
            <p className="text-gray-500 text-xs mb-6">Demo PIN: 1234</p>
  
            <button
              onClick={onCancel}
              className="w-full py-3 rounded-xl text-gray-400 text-sm font-medium transition-all duration-200 hover:text-white hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </div>
  
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            15% { transform: translateX(-8px); }
            30% { transform: translateX(8px); }
            45% { transform: translateX(-6px); }
            60% { transform: translateX(6px); }
            75% { transform: translateX(-4px); }
            90% { transform: translateX(4px); }
          }
        `}</style>
      </div>
    );
  }