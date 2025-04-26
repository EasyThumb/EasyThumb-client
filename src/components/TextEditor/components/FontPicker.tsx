import ComboBox from '@/components/ComboBox';
import { useCanvasContext } from '@/hooks/useCanvasContext';
import { fetchGoogleFontService } from '@/services/googleFontsService';
import { createEffect, createSignal, onMount } from 'solid-js';
import WebFont from 'webfontloader';

export default function FontPicker() {
    // Context
    const { googleFonts, setGoogleFonts } = useCanvasContext();

    // Signals
    const [fonts, setFonts] = createSignal<string[]>([]);
    const [selectedFont, setSelectedFont] = createSignal<string>('Montserrat');

    // Callbacks
    const handleOnSelect = (value: string) => {
        setSelectedFont(value);
    };

    // Lifecycle
    onMount(async () => {
        try {
            if (googleFonts().length == 0) {
                const res = await fetchGoogleFontService();

                setGoogleFonts(res);
                setFonts(res.map((item) => item.family));
            }
        } catch (err) {
            console.error('Error cargando fuentes de Google Fonts:', err);
        }
    });

    //Effects
    createEffect(() => {
        WebFont.load({
            google: {
                families: [selectedFont()],
            },
        });
    });

    return (
        <div class="space-y-4">
            <ComboBox options={fonts} placeholder="Search framework..." onSelect={handleOnSelect} />
        </div>
    );
}
