import { SideBarPanelEnum } from '@/context/CanvasContext';
import { useCanvasContext } from '@/hooks/useCanvasContext';
import { CanvasElement, TextPreset } from '@/types';
import { For } from 'solid-js';
import { PanelHeader } from '../PanelHeader';
import './styles.css';

export function TextPanel() {
    // Data
    const textPresetsTypes: TextPreset[] = [
        { label: 'Añadir un encabezado', fontSize: 24, color: '#000000', fontWeight: 'bold' },
        { label: 'Añadir un subtítulo', fontSize: 20, color: '#333333', fontWeight: 'normal' },
        { label: 'Añadir un cuerpo de texto', fontSize: 14, color: '#666666', fontWeight: 'normal' },
    ];

    const textPresetsEffects: TextPreset[] = [
        { label: 'Encabezado con contorno', fontSize: 24, color: '#000000' },
        { label: 'Añadir un texto con curvatura', fontSize: 24, color: '#111111', isCurved: true },
        { label: 'Añadir un texto con degradado', fontSize: 14, color: '#444444' },
    ];

    // Context
    const { setSideBarPanel, addElement, canvasElement } = useCanvasContext();

    // Callbacks
    const handleClosePanel = () => setSideBarPanel(SideBarPanelEnum.None);

    function generateNegativeIdFromMap(elementsMap: Map<number, CanvasElement>): number {
        let minId = 0;

        for (const id of elementsMap.keys()) {
            if (id < minId) {
                minId = id;
            }
        }

        return minId - 1;
    }

    const handleAddElement = (preset: TextPreset) => {
        const canvasElements = canvasElement();
        const id = generateNegativeIdFromMap(canvasElements);
        if (!canvasElements.has(id)) {
            addElement({
                id: id,
                type: 'text',
                position: { x: 200, y: 200 },
                width: 160,
                height: 100,
                text: preset.label,
                fontSize: preset.fontSize,
                color: preset.color,
                content: preset.isCurved ? 'curved' : undefined,
            });
        }
    };

    return (
        <>
            <PanelHeader title="Texto" onClose={handleClosePanel} />
            <div class="mb-6">
                <h3 class="text-lg font-semibold mb-2">Tipos</h3>
                <ul class="space-y-2">
                    <For each={textPresetsTypes}>
                        {(item) => (
                            <li>
                                <button
                                    onclick={() => handleAddElement(item)}
                                    class="text-panel-button"
                                    style={{ 'font-size': `${item.fontSize.toString()}px` }}
                                >
                                    {item.label}
                                </button>
                            </li>
                        )}
                    </For>
                </ul>
            </div>
            <div>
                <h3 class="text-lg font-semibold mb-2">Efectos</h3>
                <ul class="space-y-2">
                    <For each={textPresetsEffects}>
                        {(item) => (
                            <li>
                                <button
                                    onclick={() => handleAddElement(item)}
                                    class="text-panel-button"
                                    style={{ 'font-size': `${item.fontSize.toString()}px` }}
                                >
                                    {item.label}
                                </button>
                            </li>
                        )}
                    </For>
                </ul>
            </div>
        </>
    );
}
