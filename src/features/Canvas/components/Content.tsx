import { TextEditorPanel } from '@/components/TextEditor/TextEditorPanel';
import { useCanvasContext } from '@/hooks/useCanvasContext';
import { CanvasElement } from '@/types';
import { For } from 'solid-js';
import { InteractiveElement } from './InteractiveElement';
import './styles.css';

export function Content() {
    // Context
    const { canvasElement, removeElement, setCanvasPositions, selectedElement, setSelected } = useCanvasContext();

    // Callbacks
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
                <For each={Array.from(canvasElement().values())}>
                    {(item) => (
                        <InteractiveElement
                            element={item}
                            isSelected={item.id == selectedElement()}
                            onDelete={removeElement}
                            onSelect={() => setSelected(item.id)}
                            onUpdate={handleOnUpdate}
                        />
                    )}
                </For>
            </div>
            {selectedElement() && <TextEditorPanel />}
        </div>
    );
}
