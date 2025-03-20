export interface GalleryItemProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    onClick: () => void;
}

export const GalleryItem = (props: GalleryItemProps) => (
    <div onClick={props.onClick} class="w-full h-full relative">
        <img
            class="object-cover w-full h-[200px] cursor-pointer rounded hover:opacity-90"
            src={props.src.trim() !== '' ? props.src : undefined}
            alt={props.alt}
        />
    </div>
);
