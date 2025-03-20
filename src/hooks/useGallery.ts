import { fetchPixabayImages, PixabayParams } from '@/services/pixabayService';
import { HitsItem } from '@/types';
import { createResource, createSignal } from 'solid-js';

interface QueryFetchParams {
    query: string;
    params?: PixabayParams;
}

const cache = new Map<string, HitsItem[]>();

export function useGallery() {
    const [query, setQuery] = createSignal<QueryFetchParams>({ query: '' });
    const [imageGallery] = createResource(query, fetchImages, { initialValue: [] });

    async function fetchImages(props: QueryFetchParams) {
        if (cache.has(props.query)) return cache.get(props.query);
        const result = (await fetchPixabayImages({ q: props.query })).hits;
        cache.set(props.query, result);
        return result;
    }

    return {
        imageGallery,
        setQuery,
        fetchImages,
    };
}
