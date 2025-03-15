import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';

export function Sidebar() {
    return (
        <div class="w-64 h-screen bg-gray-950 text-white flex flex-col shadow-lg border-r border-gray-800">
            <SidebarHeader>Sidebar</SidebarHeader>
            <SidebarContent>
                <a href="#" class="flex items-center px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition">
                    Inicio
                </a>
                <a href="#" class="flex items-center px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition">
                    Servicios
                </a>
                <a href="#" class="flex items-center px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition">
                    Acerca de
                </a>
                <a href="#" class="flex items-center px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition">
                    Contacto
                </a>
            </SidebarContent>
            <SidebarFooter>&copy; 2025 Mi Sitio</SidebarFooter>
        </div>
    );
}
