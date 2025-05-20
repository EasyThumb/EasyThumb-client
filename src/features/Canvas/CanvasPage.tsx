import { Sidebar } from '@/components/Sidebar';
import { TextEditorPanel } from '@/components/TextEditor/TextEditorPanel';
import { Resizable, ResizableHandle, ResizablePanel } from '@/components/ui/resizable';
import { SideBarPanelEnum } from '../../context/CanvasContext';
import { useCanvasContext } from '../../hooks/useCanvasContext';
import { Content } from './components';
import { PanelContent } from './components/PanelContent';

export function CanvasPage() {
    // Context
    const { sidebarPanel, selectedElement, canvasElement } = useCanvasContext();

    // Callbacks
    function isTextElement(): boolean {
        const element = canvasElement().get(selectedElement() ?? 0);
        if (element && element.type == 'text') return true;
        return false;
    }
    return (
        <div class="flex h-screen">
            <Sidebar />
            {sidebarPanel() !== SideBarPanelEnum.None ? (
                <Resizable class="w-full h-full overflow-hidden">
                    <ResizablePanel initialSize={0.3} minSize={0.2}>
                        <PanelContent />
                    </ResizablePanel>

                    <ResizableHandle class="border border-solid border-gray-500 opacity-10" />

                    <ResizablePanel initialSize={0.7}>
                        <Content />
                        {isTextElement() && <TextEditorPanel />}
                    </ResizablePanel>
                </Resizable>
            ) : (
                <>
                    <Content />
                    {isTextElement() && <TextEditorPanel />}
                </>
            )}
        </div>
    );
}
