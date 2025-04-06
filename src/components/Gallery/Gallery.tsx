import { cn } from '@/libs/cn';
import { ImageItem } from '@/types';
import { GalleryItem } from './GalleryItem';

interface GalleryProps {
    className?: string;
    images: ImageItem[];
    onClick: (id: number) => void;
}

export const Gallery = (props: GalleryProps) => (
    <div class={cn(props.className, 'overflow-y-auto max-h-[calc(100vh-150px)] grid grid-cols-2 gap-2 p-1')}>
        {props.images.map((img) => (
            <GalleryItem
                onClick={() => props.onClick(img.id)}
                src={img.url}
                alt={img.alt}
                width={img.width}
                height={img.height}
            />
        ))}
    </div>
);
