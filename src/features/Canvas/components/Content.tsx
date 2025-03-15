import { CanvasElement } from '@/types';
import { createSignal } from 'solid-js';
import { InteractiveElement } from './InteractiveElement';

interface TextElement extends CanvasElement {
    type: 'text';
    text: string;
    fontSize: number;
    color: string;
}

interface ImageElement extends CanvasElement {
    type: 'image';
    src: string;
}

interface SvgElement extends CanvasElement {
    type: 'svg';
    svgContent: string;
}

export function Content() {
    const [elements, setElements] = createSignal<CanvasElement[]>([]);

    const addTextElement = () => {
        setElements((prevElements) => [
            ...prevElements,
            {
                id: prevElements.length,
                type: 'text',
                x: 100,
                y: 100,
                width: 150,
                height: 50,
                text: 'Texto Nuevo',
                fontSize: 20,
                color: 'black',
            } as TextElement,
        ]);
    };

    const addImageElement = () => {
        setElements((prevElements) => [
            ...prevElements,
            {
                id: prevElements.length,
                type: 'image',
                x: 200,
                y: 200,
                width: 150,
                height: 150,
                src: 'https://via.placeholder.com/150',
            } as ImageElement,
        ]);
    };

    const addSvgElement = () => {
        setElements((prevElements) => [
            ...prevElements,
            {
                id: prevElements.length,
                type: 'svg',
                x: 300,
                y: 300,
                width: 100,
                height: 100,
                svgContent: `<svg width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>`,
            } as SvgElement,
        ]);
    };

    return (
        <div class="w-full p-4">
            <h1>Elemento Redimensionable y Arrastrable</h1>
            <button onClick={addTextElement} style={{ 'margin-right': '10px' }}>
                Añadir Texto
            </button>
            <button onClick={addImageElement} style={{ 'margin-right': '10px' }}>
                Añadir Imagen
            </button>
            <button onClick={addSvgElement}>Añadir SVG</button>
            <div class="mt-5 w-full max-w-screen-lg h-[500px] border-2 border-dashed border-gray-400 relative overflow-hidden">
                {elements().map((element) => (
                    <InteractiveElement element={element} />
                ))}
            </div>
        </div>
    );
}
