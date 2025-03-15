import { CanvasElement } from '@/types';
import interact from 'interactjs';
import { createEffect, onCleanup } from 'solid-js';

interface CanvasElementComponentProps {
    element: CanvasElement;
}

export const InteractiveElement = (props: CanvasElementComponentProps) => {
    const { element } = props;
    let elementRef: HTMLDivElement | undefined;

    // Función que renderiza el contenido del canvas dependiendo del tipo de elemento
    const renderElement = () => {
        switch (element.type) {
            case 'text':
                return (
                    <div
                        style={{
                            'font-size': element.fontSize?.toString(),
                            color: element.color,
                            'font-weight': 'bold',
                        }}
                    >
                        {element.text}
                    </div>
                );

            case 'image':
                return <img src={element.src} alt="Imagen" style={{ width: '100%', height: '100%' }} />;

            case 'svg':
                return <div innerHTML={element.svgContent || ''} />;

            default:
                return null;
        }
    };

    createEffect(() => {
        // Si el ref no está definido, no hacemos nada
        if (!elementRef) return;

        const target = elementRef;

        interact(target)
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true },
                listeners: {
                    move(event) {
                        const x = parseFloat(target.getAttribute('data-x') || '0');
                        const y = parseFloat(target.getAttribute('data-y') || '0');

                        // Actualiza el tamaño del elemento
                        target.style.width = `${event.rect.width}px`;
                        target.style.height = `${event.rect.height}px`;

                        // Ajusta la posición cuando se redimensiona desde los bordes izquierdo o superior
                        target.style.transform = `translate(${x + event.deltaRect.left}px, ${y + event.deltaRect.top}px)`;

                        // Actualiza los atributos de posición
                        target.setAttribute('data-x', (x + event.deltaRect.left).toString());
                        target.setAttribute('data-y', (y + event.deltaRect.top).toString());

                        // Muestra el tamaño actual del elemento
                        target.textContent = `${Math.round(event.rect.width)}×${Math.round(event.rect.height)}`;
                    },
                },
                modifiers: [
                    interact.modifiers.restrictEdges({
                        outer: 'parent',
                    }),
                    interact.modifiers.restrictSize({
                        min: { width: 100, height: 50 },
                    }),
                    interact.modifiers.aspectRatio({
                        ratio: 2,
                        modifiers: [interact.modifiers.restrictSize({ max: 'parent' })],
                    }),
                ],
                inertia: true,
            })
            .draggable({
                listeners: {
                    move(event) {
                        const x = parseFloat(target.getAttribute('data-x') || '0');
                        const y = parseFloat(target.getAttribute('data-y') || '0');

                        // Actualiza la posición del elemento
                        target.style.transform = `translate(${x + event.dx}px, ${y + event.dy}px)`;
                        target.setAttribute('data-x', (x + event.dx).toString());
                        target.setAttribute('data-y', (y + event.dy).toString());
                    },
                },
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true,
                    }),
                ],
            });

        onCleanup(() => {
            interact(target).unset();
        });
    });

    return (
        <div
            ref={elementRef}
            style={{
                position: 'absolute',
                top: `${element.y}px`,
                left: `${element.x}px`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                'background-color': '#29e',
                cursor: 'move',
            }}
        >
            {renderElement()}
        </div>
    );
};
