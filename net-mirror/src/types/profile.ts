export interface Profile {
    id: string;
    name: string;
    avatarColor: string;
    avatarGradient: string;
    initials: string;
    isKids?: boolean;
    avatarIcon?: string;
    maturityRating: "ALL" | "7+" | "13+" | "18+";
  }