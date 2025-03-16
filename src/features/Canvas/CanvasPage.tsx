import { Sidebar } from '@/components/Sidebar';
import { Resizable, ResizableHandle, ResizablePanel } from '@/components/ui/resizable';
import { Content } from './components';
import { SideBarPanelEnum } from './context/CanvasContext';

import { PanelContent } from './components/PanelContent';
import { useCanvasContext } from './hooks/useCanvasContext';

export function CanvasPage() {
    const { sidebarPanel } = useCanvasContext();
    return (
        <div class="flex h-screen">
            <Sidebar />
            {sidebarPanel() !== SideBarPanelEnum.None ? (
                <Resizable class="w-full">
                    <ResizablePanel initialSize={0.3} minSize={0.2}>
                        <PanelContent />
                    </ResizablePanel>

                    <ResizableHandle class="border border-solid border-gray-500 opacity-10" />

                    <ResizablePanel initialSize={0.7}>
                        <Content />
                    </ResizablePanel>
                </Resizable>
            ) : (
                <Content />
            )}
        </div>
    );
}
