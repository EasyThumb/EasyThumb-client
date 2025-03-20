import { SideBarPanelEnum } from '@/context/CanvasContext';
import { useCanvasContext } from '@/hooks/useCanvasContext';
import { useGallery } from '@/hooks/useGallery';
import { ImageItem } from '@/types';
import { X } from 'lucide-solid';
import { createMemo, createSignal } from 'solid-js';
import { Gallery } from './Gallery';
import SearchInput from './SearchInput';
import { Button } from './ui/button';

interface PanelHeaderProps {
    title: string;
    onClose: () => void;
}

const PanelHeader = (props: PanelHeaderProps) => (
    <div class="mb-3 flex items-center justify-between lg:mb-4">
        <h3 class="text-xl font-semibold truncate">{props.title}</h3>
        <Button class="h-6 w-6 cursor-pointer" variant="ghost" size="icon" onClick={props.onClose}>
            <X class="h-6 w-6" />
        </Button>
    </div>
);

export const PhotosPanel = () => {
    // Hooks
    const { imageGallery, setQuery } = useGallery();
    const { setSideBarPanel } = useCanvasContext();

    // State
    const [filterText, setFilterText] = createSignal('');

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
                width: item.imageWidth,
                height: item.imageHeight,
            } as ImageItem;
        });
    });

    // Callbacks
    const handleClosePanel = () => setSideBarPanel(SideBarPanelEnum.None);

    const handleSetFilterText = (value: string) => setQuery((prev) => ({ ...prev, query: value }));

    return (
        <>
            <PanelHeader title="Photos" onClose={handleClosePanel} />
            <SearchInput placeHolder="Search media..." onSearch={handleSetFilterText} />
            <Gallery onClick={() => {}} images={galleryItems()} />
        </>
    );
};
