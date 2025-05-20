import { Alignment } from '@/constants/Alignment';
import { GoogleFont } from '@/services/googleFontsService';
import { AlignJustify, AlignLeft, AlignRight } from 'lucide-solid';
import { createEffect, createSignal } from 'solid-js';
import { PanelHeader } from '../PanelHeader';
import RangeInput from '../RangeInput';
import FontPicker from './components/FontPicker';
import FontSizePicker from './components/FontSizePicker';
import FontVariantPicker from './components/FontVariantPicker';

const defaultFont: GoogleFont = {
    family: 'Montserrat',
    variants: [
        '100',
        '200',
        '300',
        'regular',
        '500',
        '600',
        '700',
        '800',
        '900',
        '100italic',
        '200italic',
        '300italic',
        'italic',
        '500italic',
        '600italic',
        '700italic',
        '800italic',
        '900italic',
    ],
    subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
    version: 'v29',
    lastModified: '2024-11-07',
    files: {
        '100': 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Uw-Y3tcoqK5.ttf',
        '200': 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr6Ew-Y3tcoqK5.ttf',
        '300': 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Ew-Y3tcoqK5.ttf',
        '500': 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Ew-Y3tcoqK5.ttf',
        '600': 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w-Y3tcoqK5.ttf',
        '700': 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM70w-Y3tcoqK5.ttf',
        '800': 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr70w-Y3tcoqK5.ttf',
        '900': 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvC70w-Y3tcoqK5.ttf',
        regular: 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.ttf',
        '100italic': 'https://fonts.gstatic.com/s/montserrat/v29/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R8aX9-p7K5ILg.ttf',
        '200italic': 'https://fonts.gstatic.com/s/montserrat/v29/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR9aX9-p7K5ILg.ttf',
        '300italic': 'https://fonts.gstatic.com/s/montserrat/v29/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq_p9aX9-p7K5ILg.ttf',
        italic: 'https://fonts.gstatic.com/s/montserrat/v29/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R9aX9-p7K5ILg.ttf',
        '500italic': 'https://fonts.gstatic.com/s/montserrat/v29/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq5Z9aX9-p7K5ILg.ttf',
        '600italic': 'https://fonts.gstatic.com/s/montserrat/v29/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq3p6aX9-p7K5ILg.ttf',
        '700italic': 'https://fonts.gstatic.com/s/montserrat/v29/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq0N6aX9-p7K5ILg.ttf',
        '800italic': 'https://fonts.gstatic.com/s/montserrat/v29/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR6aX9-p7K5ILg.ttf',
        '900italic': 'https://fonts.gstatic.com/s/montserrat/v29/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqw16aX9-p7K5ILg.ttf',
    },
    category: 'sans-serif',
    kind: 'webfonts#webfont',
    menu: 'https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw_aX8.ttf',
};

export function TextEditorPanel() {
    // Signals
    const [selectedFont, setSelectedFont] = createSignal<GoogleFont>(defaultFont);
    const [selectedFontVariants, setSelectedFontVariants] = createSignal<Array<string>>(selectedFont().variants);
    const [selectedVariant, setSelectedVariant] = createSignal<string>('');
    const [selectedFontSize, setSelectedFontSize] = createSignal<string>('16');
    const [selectedInterlineado, setSelectedInterlineado] = createSignal<number>(12);
    const [selectedEspaciado, setSelectedEspaciado] = createSignal<number>(12);
    const [selectedAlignment, setSelectedAlignment] = createSignal<Alignment>(Alignment.Left);
    const [selectedUppercase, setSelectedUppercase] = createSignal<boolean>(false);
    const [selectedUnderline, setSelectedUnderline] = createSignal<boolean>(false);

    // Callbacks
    const handleFontChange = (value: GoogleFont) => {
        // console.dir(value);
        setSelectedFont(value);
    };

    const handleVariantChange = (variant: string) => {
        // console.dir(variant);
        setSelectedVariant(variant);
    };

    const handleFontSizeChange = (size: string) => {
        // console.dir(size);
        setSelectedFontSize(size);
    };

    const handleInterlineadoChange = (value: number) => {
        // console.dir(value);
        setSelectedInterlineado(value);
    };

    const handleEspaciadoChange = (value: number) => {
        // console.dir(value);
        setSelectedEspaciado(value);
    };

    const handleAlignmentChange = (event: MouseEvent) => {
        if (selectedAlignment() === Alignment.Left) {
            setSelectedAlignment(Alignment.Justify);
        } else if (selectedAlignment() === Alignment.Justify) {
            setSelectedAlignment(Alignment.Right);
        } else {
            setSelectedAlignment(Alignment.Left);
        }
    };

    const handleCaseChange = (event: MouseEvent) => {
        setSelectedUppercase(!selectedUppercase());
    };

    const handleUnderlineChange = (event: MouseEvent) => {
        setSelectedUnderline(!selectedUnderline());
    };

    // Effects
    createEffect(() => {
        setSelectedFontVariants(selectedFont().variants);
    });

    return (
        <div class="absolute top-0 right-0 w-84 z-40 p-4 h-screen text-black flex flex-col shadow-lg border-r border-gray-800 bg-white">
            <PanelHeader title="Edicion Texto" onClose={() => {}} />

            {/* Fonts */}
            <div>
                <label class="block text-sm font-medium mb-1">Fuentes</label>
                <div class="flex flex-col space-y-2">
                    <FontPicker value={selectedFont} onChange={handleFontChange} />

                    {/* Peso de fuente y tamaño */}
                    <div class="flex space-x-2">
                        <FontVariantPicker
                            options={selectedFontVariants}
                            value={selectedVariant}
                            onChange={handleVariantChange}
                        />
                        <FontSizePicker value={selectedFontSize} onChange={handleFontSizeChange} />
                    </div>
                </div>
            </div>

            {/* Interlineado */}
            <RangeInput label="Interlineado" value={selectedInterlineado} onChange={handleInterlineadoChange} min={0} max={24} />

            {/* Espaciado */}
            <RangeInput label="Espaciado" value={selectedEspaciado} onChange={handleEspaciadoChange} min={0} max={24} />

            {/* Botones de acciones */}
            <div class="flex justify-between items-center pt-2">
                {/* Alineación */}
                <div class="flex flex-col items-center space-y-1">
                    <span class="text-xs text-gray-600">Alineación</span>
                    <button class="border px-2 py-1 rounded text-lg" onClick={handleAlignmentChange}>
                        {selectedAlignment() === Alignment.Left && <AlignLeft />}
                        {selectedAlignment() === Alignment.Justify && <AlignJustify />}
                        {selectedAlignment() === Alignment.Right && <AlignRight />}
                    </button>
                </div>

                {/* Mayúsculas */}
                <div class="flex flex-col items-center space-y-1">
                    <span class="text-xs text-gray-600">Mayúsculas</span>
                    <button
                        class="border px-2 py-1 rounded font-bold"
                        onClick={handleCaseChange}
                        style={{
                            'box-shadow': selectedUppercase() ? '0px 0px 10px 0px rgba(0,0,0,0.15)' : '',
                            transform: selectedUppercase() ? 'translateY(-1px)' : '',
                            transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
                        }}
                    >
                        A a
                    </button>
                </div>

                {/* Subrayar */}
                <div class="flex flex-col items-center space-y-1">
                    <span class="text-xs text-gray-600">Subrayar</span>
                    <button
                        class="border px-2 py-1 rounded text-lg underline"
                        onClick={handleUnderlineChange}
                        style={{
                            'box-shadow': selectedUnderline() ? '0px 0px 8px 0px rgba(0,0,0,0.15)' : '',
                            transform: selectedUnderline() ? 'translateY(-1px)' : '',
                            transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
                        }}
                    >
                        U
                    </button>
                </div>
            </div>
        </div>
    );
}
