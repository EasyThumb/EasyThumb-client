import { HitsItem } from '@/types';
import { httpRequest } from './httpService';

export interface PixabayImage {
    total: number;
    totalHits: number;
    hits: HitsItem[];
}

export interface PixabayParams {
    q?: string;
    lang?: string;
    id?: string;
    image_type?: string;
    orientation?: string;
    category?: string;
    min_width?: number;
    min_height?: number;
    colors?: string;
    editors_choice?: boolean;
    safesearch?: boolean;
    order?: string;
    page?: number;
    per_page?: number;
    callback?: string;
    pretty?: boolean;
}

export async function fetchPixabayImages(params: PixabayParams) {
    const API_KEY = import.meta.env.VITE_PUBLIC_PIXABAY_API_KEY;
    const baseUrl = `https://pixabay.com/api/?key=${API_KEY}`;

    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, String(value));
        }
    });

    const url = `${baseUrl}&${queryParams.toString()}`;
    return httpRequest<PixabayImage>(url);
}
