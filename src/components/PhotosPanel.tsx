import { SideBarPanelEnum } from '@/context/CanvasContext';
import { useCanvasContext } from '@/hooks/useCanvasContext';
import { useGallery } from '@/hooks/useGallery';
import { ImageItem } from '@/types';
import { createMemo } from 'solid-js';
import { Gallery } from './Gallery';
import { PanelHeader } from './PanelHeader';
import SearchInput from './SearchInput';

export const PhotosPanel = () => {
    // Hooks
    const { imageGallery, setQuery } = useGallery();
    const { setSideBarPanel, addElement } = useCanvasContext();

    // Data
    const galleryItems = createMemo(() => {
        const images = imageGallery();
        if (!images) {
            return [];
        }

        return images.map((item) => {
            return {
                id: item.id,
                alt: '',
                url: item.webformatURL,
                width: item.webformatWidth,
                height: item.webformatHeight,
            } as ImageItem;
        });
    });

    // Callbacks
    const handleClosePanel = () => setSideBarPanel(SideBarPanelEnum.None);

    const handleSetFilterText = (value: string) => setQuery((prev) => ({ ...prev, query: value }));

    const handleAddElement = (id: number) => {
        const images = imageGallery();
        const findedIndex = images?.findIndex((img) => img.id == id);
        if (images && findedIndex && findedIndex > 0) {
            const img = images[findedIndex];
            addElement({
                id: img.id,
                type: 'image',
                position: { x: 200, y: 200 },
                width: img.webformatWidth,
                height: img.webformatHeight,
                src: img.webformatURL,
                aspectRatio: img.webformatWidth / img.webformatHeight,
            });
        }
    };

    return (
        <>
            <PanelHeader title="Photos" onClose={handleClosePanel} />
            <SearchInput placeHolder="Search media..." onSearch={handleSetFilterText} />
            <Gallery onClick={handleAddElement} images={galleryItems()} />
        </>
    );
};
