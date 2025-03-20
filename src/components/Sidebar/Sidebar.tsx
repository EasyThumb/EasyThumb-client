import { SideBarPanelEnum } from '@/context/CanvasContext';
import { useCanvasContext } from '@/hooks/useCanvasContext';
import { LayoutTemplate, Shapes, Type } from 'lucide-solid';
import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';

interface SideBarItems {
    icon: any;
    title: string;
    value: SideBarPanelEnum;
}

export function Sidebar() {
    const { sidebarPanel, setSideBarPanel } = useCanvasContext();
    const sidebarItems: SideBarItems[] = [
        {
            icon: Type,
            value: SideBarPanelEnum.Text,
            title: 'Text',
        },
        {
            icon: Shapes,
            value: SideBarPanelEnum.Elements,
            title: 'Elements',
        },
        {
            icon: LayoutTemplate,
            value: SideBarPanelEnum.Photos,
            title: 'Photos',
        },
    ];

    return (
        <div class="w-64 h-screen bg-gray-950 text-white flex flex-col shadow-lg border-r border-gray-800">
            <SidebarHeader>Sidebar</SidebarHeader>
            <SidebarContent>
                {sidebarItems.map((item) => (
                    <a
                        onclick={() => setSideBarPanel(sidebarPanel() === item.value ? SideBarPanelEnum.None : item.value)}
                        class="flex items-center px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
                    >
                        <item.icon class="h-8 w-8 mb-1" />
                        {item.title}
                    </a>
                ))}
            </SidebarContent>
            <SidebarFooter>&copy; 2025 Mi Sitio</SidebarFooter>
        </div>
    );
}
