export const QUERY_KEYS = {
    trending: (type: "movie" | "tv" | "all") => ["trending", type] as const,
    
    topRated: (type: "movie" | "tv" | "all") => ["topRated", type] as const,
    popular: (type: "movie" | "tv" | "all") => ["popular", type] as const,
    genre: (type: "movie" | "tv", genre: string) =>
      ["genre", type, genre] as const,
  
    byId: (type: "movie" | "tv", id: number) =>
      [type, id] as const,
  
    search: (type: "movie" | "tv" | "multi", query: string) =>
      ["search", type, query] as const,

  }