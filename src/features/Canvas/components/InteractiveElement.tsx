import { CanvasElement } from '@/types';
import interact from 'interactjs';
import { createEffect, createSignal, onCleanup } from 'solid-js';

interface CanvasElementComponentProps {
    element: CanvasElement;
    isSelected: boolean;
    onDelete: (id: number) => void; // Función para eliminar el elemento
    onUpdate: (id: number, updatedElement: Partial<CanvasElement>) => void;
    onSelect: () => void;
}

type PositionsHandler = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right';

export const InteractiveElement = (props: CanvasElementComponentProps) => {
    // Props
    const { element, onDelete } = props;

    // Refs
    let elementRef: HTMLDivElement | undefined;
    let imgRef: HTMLImageElement | undefined;

    // State
    const [isCtrlPressed, setIsCtrlPressed] = createSignal(false);

    // Callbacks
    const renderElement = () => {
        switch (element.type) {
            case 'text':
                return (
                    <div
                        contentEditable={props.isSelected}
                        style={{
                            outline: 'none',
                            'font-size': `${element.fontSize}px`,
                            color: element.color,
                            'font-weight': element.fontWeight,
                            'font-style': element.fontStyle,
                            'white-space': 'pre-wrap',
                            'word-wrap': 'break-word',
                            'line-height': element.lineHeight,
                            'letter-spacing': `${element.letterSpacing}px`,
                            'font-family': element.fontFamily,
                        }}
                    >
                        {element.text}
                    </div>
                );

            case 'image':
                return <img ref={imgRef} src={element.src} alt="Imagen" style={{ width: '100%', height: '100%' }} />;

            case 'svg':
                return <div innerHTML={element.svgContent || ''} />;

            default:
                return null;
        }
    };

    const renderHandle = (positionsHandler: PositionsHandler) => {
        const baseClasses = `
          absolute 
          ${positionsHandler == 'top' || positionsHandler == 'bottom' ? 'w-6' : 'w-4'} h-4 
          bg-blue-500
          rounded-full
          border-4 border-white
          cursor-pointer
          z-10
          shadow-md
        `;

        const positionClasses = {
            'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize',
            'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize',
            'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize',
            'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize',
            top: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize',
            right: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2 cursor-ew-resize',
            bottom: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize',
            left: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize',
        };

        return <div class={`${baseClasses} ${positionClasses[positionsHandler as keyof typeof positionClasses]}`} />;
    };

    // Effects
    createEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.target as HTMLElement)?.isContentEditable) {
                return;
            }

            if (event.key === 'Control' || event.key === 'Meta') {
                setIsCtrlPressed(true);
            }

            if (event.key === 'Delete' || event.key === 'Backspace') {
                props.isSelected && onDelete(element.id);
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === 'Control' || event.key === 'Meta') {
                setIsCtrlPressed(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        onCleanup(() => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        });
    });

    createEffect(() => {
        if (!elementRef) return;
        const target = elementRef;

        interact(target)
            .resizable({
                edges: { left: true, right: true, bottom: true, top: true },
                listeners: {
                    move(event) {
                        const target = event.target;

                        // obtén valores anteriores
                        let x = parseFloat(target.getAttribute('data-x') || '0');
                        let y = parseFloat(target.getAttribute('data-y') || '0');

                        // cambia tamaño visual
                        target.style.width = `${event.rect.width}px`;
                        target.style.height = `${event.rect.height}px`;

                        // cambia posición visual (si estás redimensionando desde top o left)
                        x += event.deltaRect.left;
                        y += event.deltaRect.top;

                        target.style.transform = `translate(${x}px, ${y}px)`;
                        target.setAttribute('data-x', x.toString());
                        target.setAttribute('data-y', y.toString());
                    },
                },
                modifiers: [
                    interact.modifiers.restrictEdges({
                        outer: 'parent',
                    }),
                    interact.modifiers.restrictSize({
                        min: { width: 100, height: 50 },
                    }),
                    ...(isCtrlPressed() ? [interact.modifiers.aspectRatio()] : []),
                ],
                inertia: true,
            })
            .draggable({
                listeners: {
                    move(event) {
                        let x = parseFloat(target.getAttribute('data-x') || '0');
                        let y = parseFloat(target.getAttribute('data-y') || '0');

                        x += event.dx;
                        y += event.dy;

                        target.style.transform = `translate(${x}px, ${y}px)`;
                        target.setAttribute('data-x', x.toString());
                        target.setAttribute('data-y', y.toString());
                    },
                },
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true,
                    }),
                ],
                autoScroll: true,
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
                top: 0,
                left: 0,
                width: `${element.width}px`,
                height: `${element.height}px`,
                cursor: 'move',
                transform: `translate(${element.position.x}px, ${element.position.y}px)`,
            }}
            onClick={(e) => {
                e.stopPropagation();
                props.onSelect();
            }}
            data-x={element.position.x}
            data-y={element.position.y}
        >
            {props.isSelected && (
                <>
                    <div class="absolute inset-0 border-2 border-blue-500 pointer-events-none z-5 rounded" />
                    <div>
                        {renderHandle('top-left')}
                        {renderHandle('top-right')}
                        {renderHandle('bottom-left')}
                        {renderHandle('bottom-right')}
                        {renderHandle('top')}
                        {renderHandle('right')}
                        {renderHandle('bottom')}
                        {renderHandle('left')}
                    </div>
                </>
            )}

            {renderElement()}
        </div>
    );
};
