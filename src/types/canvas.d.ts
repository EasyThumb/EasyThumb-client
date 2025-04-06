export type CanvasElement = {
    id: number;
    type: 'text' | 'image' | 'svg'; // Definir los tipos posibles
    width: number;
    height: number;
    position: { x: number; y: number };
    aspectRatio?: number;
    zIndex?: number;
    // Used for text type
    text?: string;
    fontSize?: number;
    color?: string;
    // Used for svg or text type
    content?: string;
    // Used for image type
    src?: string;
    // Used for svg type
    svgContent?: string;
};
