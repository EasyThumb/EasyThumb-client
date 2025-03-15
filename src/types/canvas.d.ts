export interface CanvasElement {
    id: number;
    type: 'text' | 'image' | 'svg';
    x: number;
    y: number;
    width: number;
    height: number;
    text?: string;
    fontSize?: number;
    color?: string;
    src?: string;
    svgContent?: string;
}
