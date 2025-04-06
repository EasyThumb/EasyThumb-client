import { PhotosPanel } from '@/components/PhotosPanel';
import { TextPanel } from '@/components/TextPanel/TextPanel';
import { cn } from '@/libs/cn';
import { SideBarPanelEnum } from '../../../context/CanvasContext';
import { useCanvasContext } from '../../../hooks/useCanvasContext';

export function PanelContent() {
    const { sidebarPanel } = useCanvasContext();

    const renderPanel = () => {
        switch (sidebarPanel()) {
            case SideBarPanelEnum.Text:
                return <TextPanel />;
            case SideBarPanelEnum.Photos:
                return <PhotosPanel />;
            case SideBarPanelEnum.Elements:
                return <div>ELEMENT</div>;
        }
    };
    return (
        <div class={cn('w-full h-full  text-zinc-100')}>
            <div
                class={cn(
                    'w-80 h-full w-full nmax-w-[1000px] p-4 space-y-6 text-neutral-800 dark:text-white dark:custom-dark-bg'
                )}
            >
                {renderPanel()}
            </div>
        </div>
    );
}
