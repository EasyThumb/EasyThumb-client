import { PanelHeader } from '../PanelHeader';
import FontPicker from './components/FontPicker';

export function TextEditorPanel() {
    return (
        <div class="absolute top-0 right-0 w-84 z-40 p-4 h-screen text-black flex flex-col shadow-lg border-r border-gray-800">
            <PanelHeader title="Edicion Texto" onClose={() => {}} />
            {/* Fonts */}
            <div>
                <label class="block text-sm font-medium mb-1">Fuentes</label>
                <div class="flex flex-col space-y-2">
                    <FontPicker />

                    {/* Peso de fuente y tamaño */}
                    <div class="flex space-x-2">
                        <div class="flex-1 border rounded px-2 py-1 flex justify-between items-center">
                            <span class="text-sm text-gray-500">Extra Bold</span>
                            <span>▼</span>
                        </div>
                        <div class="w-16 border rounded px-2 py-1 flex justify-between items-center">
                            <span class="text-sm text-gray-500">16</span>
                            <span>▼</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interlineado */}
            <div>
                <label class="block text-sm font-medium mb-1">Interlineado</label>
                <div class="flex items-center space-x-2">
                    <div class="w-16 border rounded px-2 py-1 flex justify-between items-center">
                        <span class="text-sm text-gray-500">12</span>
                        <span>▼</span>
                    </div>
                    <input type="range" class="w-full" />
                </div>
            </div>

            {/* Espaciado */}
            <div>
                <label class="block text-sm font-medium mb-1">Espaciado</label>
                <div class="flex items-center space-x-2">
                    <div class="w-16 border rounded px-2 py-1 flex justify-between items-center">
                        <span class="text-sm text-gray-500">12</span>
                        <span>▼</span>
                    </div>
                    <input type="range" class="w-full" />
                </div>
            </div>

            {/* Botones de acciones */}
            <div class="flex justify-between items-center pt-2">
                {/* Alineación */}
                <div class="flex flex-col items-center space-y-1">
                    <span class="text-xs text-gray-600">Alineación</span>
                    <button class="border px-2 py-1 rounded text-lg">≡</button>
                </div>

                {/* Mayúsculas */}
                <div class="flex flex-col items-center space-y-1">
                    <span class="text-xs text-gray-600">Mayúsculas</span>
                    <button class="border px-2 py-1 rounded font-bold">A a</button>
                </div>

                {/* Subrayar */}
                <div class="flex flex-col items-center space-y-1">
                    <span class="text-xs text-gray-600">Subrayar</span>
                    <button class="border px-2 py-1 rounded text-lg underline">U</button>
                </div>
            </div>
        </div>
    );
}
