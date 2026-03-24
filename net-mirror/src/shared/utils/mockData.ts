// ─── Mock Data ────────────────────────────────────────────────────────────────

import type { Movie } from "../../types/movie";
import type { Profile } from "../../types/profile";

export const FEATURED_MOVIE: Movie = {
    id: 1,
    title: "Stellar Horizon",
    description:
      "A crew of astronauts ventures beyond the known galaxy, only to discover a signal that rewrites everything humanity thought it knew about the universe — and about themselves.",
    rating: "TV-MA",
    year: 2024,
    duration: "2h 18m",
    genres: ["Sci-Fi", "Thriller", "Drama"],
    match: 98,
    heroImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=80",
    posterImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
  };
  
  export const TRENDING: Movie[] = [
    {
      id: 2, title: "Neon Requiem", description: "", rating: "TV-MA", year: 2024,
      duration: "1h 52m", genres: ["Crime", "Neo-Noir"], match: 95,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80",
    },
    {
      id: 3, title: "The Pale Gate", description: "", rating: "TV-14", year: 2023,
      duration: "2h 5m", genres: ["Horror", "Mystery"], match: 91,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=400&q=80",
    },
    {
      id: 4, title: "Ashborn", description: "", rating: "R", year: 2024,
      duration: "1h 44m", genres: ["Action", "Fantasy"], match: 89,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
    },
    {
      id: 5, title: "Quiet Protocol", description: "", rating: "TV-MA", year: 2024,
      duration: "1h 37m", genres: ["Spy", "Thriller"], match: 94,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&q=80",
    },
    {
      id: 6, title: "Verdant", description: "", rating: "PG-13", year: 2023,
      duration: "1h 58m", genres: ["Nature", "Drama"], match: 87,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
    },
    {
      id: 7, title: "Iron Meridian", description: "", rating: "TV-MA", year: 2024,
      duration: "2h 12m", genres: ["Action", "Sci-Fi"], match: 92,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
    },
    {
      id: 8, title: "Mirror Lake", description: "", rating: "R", year: 2023,
      duration: "1h 49m", genres: ["Psychological", "Thriller"], match: 88,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
    },
  ];
  
  export const TOP_RATED: Movie[] = [
    {
      id: 9, title: "Embers of Atlas", description: "", rating: "TV-MA", year: 2022,
      duration: "2h 28m", genres: ["Epic", "Drama"], match: 99,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
    },
    {
      id: 10, title: "The Cartographer", description: "", rating: "PG-13", year: 2021,
      duration: "2h 3m", genres: ["Adventure", "Mystery"], match: 97,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
    {
      id: 11, title: "Fracture Line", description: "", rating: "R", year: 2023,
      duration: "1h 56m", genres: ["Disaster", "Drama"], match: 96,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1544892456-3e18e7b07ba2?w=400&q=80",
    },
    {
      id: 12, title: "Last Frequency", description: "", rating: "TV-14", year: 2022,
      duration: "1h 42m", genres: ["Music", "Romance"], match: 95,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    },
    {
      id: 13, title: "Covenant", description: "", rating: "TV-MA", year: 2023,
      duration: "2h 17m", genres: ["Historical", "Epic"], match: 97,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80",
    },
    {
      id: 14, title: "Zero Meridian", description: "", rating: "R", year: 2022,
      duration: "1h 51m", genres: ["Sci-Fi", "Drama"], match: 94,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80",
    },
    {
      id: 15, title: "Tidal", description: "", rating: "PG", year: 2021,
      duration: "1h 34m", genres: ["Animated", "Family"], match: 96,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80",
    },
  ];
  
  export const ACTION_MOVIES: Movie[] = [
    {
      id: 16, title: "Blood Circuit", description: "", rating: "R", year: 2024,
      duration: "1h 58m", genres: ["Action", "Crime"], match: 91,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&q=80",
    },
    {
      id: 17, title: "Shadow Protocol", description: "", rating: "TV-MA", year: 2024,
      duration: "2h 6m", genres: ["Action", "Spy"], match: 93,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1535223289429-462029bcd39c?w=400&q=80",
    },
    {
      id: 18, title: "Terminus", description: "", rating: "R", year: 2023,
      duration: "1h 47m", genres: ["Post-Apocalyptic", "Action"], match: 88,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
    },
    {
      id: 19, title: "Warlord's Peak", description: "", rating: "TV-MA", year: 2024,
      duration: "2h 21m", genres: ["War", "Action"], match: 90,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1548263594-a71ea65a8598?w=400&q=80",
    },
    {
      id: 20, title: "Ghost Voltage", description: "", rating: "PG-13", year: 2023,
      duration: "1h 39m", genres: ["Action", "Sci-Fi"], match: 87,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&q=80",
    },
    {
      id: 21, title: "Red Frontier", description: "", rating: "R", year: 2024,
      duration: "2h 2m", genres: ["Western", "Action"], match: 92,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&q=80",
    },
    {
      id: 22, title: "Ironclad", description: "", rating: "TV-14", year: 2023,
      duration: "1h 55m", genres: ["Historical", "Action"], match: 89,
      heroImage: "", posterImage: "https://images.unsplash.com/photo-1498036882173-b41c28a8b34f?w=400&q=80",
    },
  ];


export const PROFILES: Profile[] = [
    {
      id: "1",
      name: "Alex",
      avatarColor: "#e50914",
      avatarGradient: "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
      initials: "AX",
      maturityRating: "18+",
      avatarIcon: "🎬",
    },
    {
      id: "2",
      name: "Jordan",
      avatarColor: "#2563eb",
      avatarGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      initials: "JD",
      maturityRating: "13+",
      avatarIcon: "🎭",
    },
    {
      id: "3",
      name: "Morgan",
      avatarColor: "#7c3aed",
      avatarGradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
      initials: "MG",
      maturityRating: "18+",
      avatarIcon: "🎸",
    },
    {
      id: "4",
      name: "Kids",
      avatarColor: "#059669",
      avatarGradient: "linear-gradient(135deg, #34d399 0%, #059669 100%)",
      initials: "KD",
      maturityRating: "ALL",
      isKids: true,
      avatarIcon: "🌟",
    },
  ];