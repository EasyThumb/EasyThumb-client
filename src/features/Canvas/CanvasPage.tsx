import { Sidebar } from '@/components/Sidebar';
import { TextEditorPanel } from '@/components/TextEditor/TextEditorPanel';
import { createSignal } from 'solid-js';
import { SideBarPanelEnum } from '../../context/CanvasContext';
import { useCanvasContext } from '../../hooks/useCanvasContext';
import { Content } from './components';
import { PanelContent } from './components/PanelContent';

export function CanvasPage() {
    // Context
    const { sidebarPanel, selectedElement, canvasElement } = useCanvasContext();

    // signlas
    const [showTextEditor, setShowTextEditor] = createSignal<boolean>(true);

    // Callbacks
    function isTextElement(): boolean {
        const element = canvasElement().get(selectedElement() ?? 0);
        if (element && element.type == 'text') return true;
        return false;
    }
    return (
        <div class="flex h-screen">
            <Sidebar />
            {sidebarPanel() !== SideBarPanelEnum.None && <PanelContent />}
            <Content />
            {isTextElement() && showTextEditor() && (
                <TextEditorPanel onCloseEditor={() => setShowTextEditor(!showTextEditor())} />
            )}
        </div>
    );
}
