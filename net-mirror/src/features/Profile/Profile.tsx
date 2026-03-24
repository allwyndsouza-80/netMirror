import { useState, useEffect } from "react";
import type { Profile } from "../../types/profile";
import { PROFILES } from "../../shared/utils/mockData";
import ProfileCard from "../../shared/components/ProfileCard";
import AddProfileCard from "../../shared/components/AddProfileCard";
import PinModal from "../../shared/components/PinModal";
import { useProfileStore } from "../../store/useProfileStore";
import { useNavigate } from "react-router-dom";
import { REDIRECT_AFTER_PROFILE_SELECTION } from "../../shared/utils/constant";



export default function Profile() {
  const selectProfile = useProfileStore((s) => s.selectProfile);
  const [profiles, setProfiles] = useState<Profile[]>(PROFILES);
  const [isManaging, setIsManaging] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [enteredProfile, setEnteredProfile] = useState<Profile | null>(null);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (profile: Profile) => {
    setSelectedProfile(profile);
    if (profile.id === "2") {
      // Jordan has a PIN lock (demo)
      setShowPinModal(true);
    } else {
      handleEnter(profile);
    }

    selectProfile(profile)
  };

  const handleEnter = (profile: Profile) => {
    setEnteredProfile(profile);
    setShowPinModal(false);
    setSelectedProfile(null);
  
    // ⏳ Show animation for 2s, then navigate
    setTimeout(() => {
      setEnteredProfile(null);
      navigate(REDIRECT_AFTER_PROFILE_SELECTION, { replace: true });// 
    }, 2000);
  };

  const handleDelete = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "#141414",
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(229,9,20,0.08) 0%, transparent 60%)",
      }}
    >


      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Title */}
        <div
          className="text-center mb-12 md:mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
          }}
        >
          <h1
            className="text-white font-semibold mb-2"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.02em" }}
          >
            {isManaging ? "Manage Profiles" : "Who's watching?"}
          </h1>
          {!isManaging && (
            <p className="text-gray-500 text-sm">Select your profile to continue</p>
          )}
        </div>

        {/* Profiles grid */}
        <div className="flex flex-wrap items-start justify-center gap-6 md:gap-10 mb-14 md:mb-16 max-w-3xl">
          {profiles.map((profile, i) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              index={i}
              isManaging={isManaging}
              onSelect={handleSelect}
              onDelete={handleDelete}
              visible={visible}
            />
          ))}

          {/* Add profile */}
          {isManaging && profiles.length < 5 && (
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${profiles.length * 80}ms, transform 0.5s ease ${profiles.length * 80}ms`,
              }}
            >
              <AddProfileCard onManage={() => {}} />
            </div>
          )}
        </div>

        {/* Bottom actions */}
        <div
          className="flex flex-col items-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.5s",
          }}
        >
          <button
            onClick={() => setIsManaging(!isManaging)}
            className="px-8 py-2.5 rounded text-sm font-medium tracking-wider transition-all duration-200"
            style={{
              border: "1.5px solid rgba(255,255,255,0.35)",
              color: isManaging ? "white" : "rgba(255,255,255,0.65)",
              background: isManaging ? "rgba(255,255,255,0.1)" : "transparent",
              letterSpacing: "0.08em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              if (!isManaging) {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
              }
            }}
          >
            {isManaging ? "DONE" : "MANAGE PROFILES"}
          </button>

          {isManaging && (
            <p className="text-gray-600 text-xs text-center max-w-xs">
              Click a profile to edit it, or tap the × to remove it
            </p>
          )}
        </div>
      </main>

      {/* PIN Modal */}
      {showPinModal && selectedProfile && (
        <PinModal
          profile={selectedProfile}
          onSuccess={handleEnter}
          onCancel={() => {
            setShowPinModal(false);
            setSelectedProfile(null);
          }}
        />
      )}

      {/* "Entering as..." toast */}
      {enteredProfile && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex flex-col items-center gap-5 animate-fade-scale-in">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl"
              style={{
                background: enteredProfile.avatarGradient,
                boxShadow: `0 20px 60px ${enteredProfile.avatarColor}60`,
              }}
            >
              {enteredProfile.avatarIcon}
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Entering as</p>
              <p className="text-white text-2xl font-semibold">{enteredProfile.name}</p>
            </div>
            {/* Loading bar */}
            <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  background: enteredProfile.avatarGradient,
                  animation: "loadbar 1.8s ease forwards",
                }}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes loadbar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes fade-scale-in {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-scale-in {
          animation: fade-scale-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}