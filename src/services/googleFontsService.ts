import { httpRequest } from './httpService';

export interface GoogleFontFileVariants {
    [variant: string]: string;
}

export interface GoogleFont {
    family: string;
    category: string;
    kind: string;
    lastModified: string;
    menu: string;
    files: GoogleFontFileVariants;
    subsets: string[];
    variants: string[];
    version: string;
}

export interface GoogleFontResponse {
    items: GoogleFont[];
}

export async function fetchGoogleFontService() {
    const API_KEY = import.meta.env.VITE_PUBLIC_GOOGLE_FONTS_API_KEY;
    const baseUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`;

    const response = await httpRequest<GoogleFontResponse>(baseUrl);
    return response.items;
}
