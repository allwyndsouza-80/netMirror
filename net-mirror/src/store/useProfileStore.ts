// src/store/useProfileStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile } from "../types/profile";
import { PROFILES } from "../shared/utils/mockData";

interface ProfileState {
  profiles: Profile[];
  selectedProfile: Profile | null;

  setProfiles: (profiles: Profile[]) => void;
  selectProfile: (profile: Profile) => void;
  clearProfile: () => void;
}
export const useProfileStore = create<ProfileState>()(
    persist(
      (set) => ({
        profiles: PROFILES,
        selectedProfile: null,
      
        setProfiles: (profiles) => set({ profiles }),
      
        selectProfile: (profile) =>
          set({
            selectedProfile: profile,
          }),
      
        clearProfile: () => set({ selectedProfile: null }),
      }),
      { name: "profile-storage" }
    )
  );