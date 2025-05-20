import { useCanvasContext } from '@/hooks/useCanvasContext';
import { createEffect, createSignal, For } from 'solid-js';
import { InteractiveElement } from './InteractiveElement';
import './styles.css';

export function Content() {
    // Context
    const { canvasElement, selectedElement, setSelected, zoom, setZoom } = useCanvasContext();

    // Signals
    const [shouldScroll, setShouldScroll] = createSignal(false);

    // Refs
    let containerRef: HTMLDivElement | undefined;

    // Callbacks
    createEffect(() => {
        const canvasWidth = 1920;
        const canvasHeight = 1080;
        const scaledWidth = canvasWidth * zoom();
        const scaledHeight = canvasHeight * zoom();
        const viewportWidth = containerRef?.offsetWidth || Number.MAX_VALUE;
        const viewportHeight = containerRef?.offsetHeight || Number.MAX_VALUE;

        console.log('scaledWidth', scaledWidth);
        console.log('scaledHeight', scaledHeight);

        // console.log('viewportWidth', viewportWidth);
        // console.log('viewportHeight', viewportHeight);

        console.log('containerRef', containerRef?.clientWidth);
        console.dir('containerRef', containerRef?.offsetHeight);

        setShouldScroll(scaledWidth > viewportWidth || scaledHeight > viewportHeight);
    });

    return (
        <div
            ref={containerRef}
            class={`flex items-center justify-center w-full h-screen overflow-${shouldScroll() ? 'auto' : 'hidden'}`}
        >
            {/* // TODO: The idea is to make zoom in heavily to navigate through canvas, have to improve it to make that feature */}
            <input
                type="range"
                min={-3}
                max={0.59}
                step={0.01}
                value={Math.log2(zoom())}
                onInput={(e) => {
                    const logZoom = parseFloat(e.currentTarget.value);
                    const actualZoom = Math.pow(2, logZoom);
                    setZoom(actualZoom);
                }}
                class="fixed bottom-4 left-4 w-48"
            />
            <div
                class="mt-5 w-full max-w-screen-lg h-[500px] bg-white border-2 border-dashed border-gray-400 relative overflow-hidden"
                style={{
                    transform: `scale(${zoom()})`,
                }}
            >
                <For each={Array.from(canvasElement().values())}>
                    {(item) => (
                        <InteractiveElement
                            element={item}
                            isSelected={item.id == selectedElement()}
                            onDelete={() => {}}
                            onSelect={() => setSelected(item.id)}
                            onUpdate={() => {}}
                        />
                    )}
                </For>
            </div>
        </div>
    );
}
