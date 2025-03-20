// // import {
// //     fetchPixabayImages,
// //     HitsItem,
// //     PixabayParams,
// // } from '@/app/services/pixabayService';
// import { create } from 'zustand';

// interface GalleryState {
//     images: HitsItem[];
//     hasFetched: boolean;
//     fetchImages: (query: string) => Promise<void>;
//     onClickImage: (id: number) => void;
// }

// export const useGalleryStore = create<GalleryState>((set) => ({
//     images: [],
//     hasFetched: false,
//     onClickImage: (id?: number) => {},
//     fetchImages: async (query: string, params?: PixabayParams) => {
//         try {
//             const result = await fetchPixabayImages({ q: query });
//             set({ images: result.hits, hasFetched: true });
//         } catch (err) {
//             console.error('Error fetching images:', err);
//         }
//     },
// }));
