export interface Movie { 
    id: number;
    title: string;
    description: string;
    rating: string;
    year: number;
    duration: string;
    genres: string[];
    heroImage: string;
    posterImage: string;
    match: number;
    mediaType?: "movie" | "tv";  
 }