import { useCanvasContext } from '@/hooks/useCanvasContext';
import { CanvasElement } from '@/types';
import { createSignal } from 'solid-js';
import { InteractiveElement } from './InteractiveElement';
import './styles.css';

export function Content() {
    const { canvasElement, setCanvasElement, setCanvasPositions } = useCanvasContext();
    const [selected, setSelected] = createSignal<number | null>(null);

    function deleteCanvasElement(id: number) {
        const elements = new Map(canvasElement());
        elements.delete(id);
        setCanvasElement(elements);
    }

    function handleOnUpdate(id: number, updatedElement: Partial<CanvasElement>) {
        setCanvasPositions((prev) => {
            const updatedElements = new Map(prev);
            const element = canvasElement().get(id);
            if (element) {
                updatedElements.set(id, { ...element, ...updatedElement });
            }
            return updatedElements;
        });
    }

    return (
        <div class="w-full h-full p-4">
            <div class="mt-5 w-full max-w-screen-lg h-[500px] border-2 border-dashed border-gray-400 relative overflow-hidden">
                {Array.from(canvasElement().values()).map((item) => {
                    console.log('render items again', item);
                    return (
                        <InteractiveElement
                            element={item}
                            isSelected={item.id == selected()}
                            onDelete={deleteCanvasElement}
                            onSelect={() => setSelected(item.id)}
                            onUpdate={handleOnUpdate}
                        />
                    );
                })}
            </div>
        </div>
    );
}
