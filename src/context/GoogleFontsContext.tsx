import { fetchGoogleFontService, GoogleFont } from '@/services/googleFontsService';
import { createContext, createSignal, JSX } from 'solid-js';

export interface GoogleFontsContextType {
    fonts: () => GoogleFont[];
    fetch: () => Promise<void>;
    variant2style: (variant: string) => JSX.CSSProperties;
    variant2desc: (variant: string) => string;
    variantsAvailable: Array<string>;
}

export const GoogleFontsContext = createContext<GoogleFontsContextType>();

export interface GoogleFontsProviderProps {
    children: JSX.Element;
}
export function GoogleFontsProvider(props: GoogleFontsProviderProps) {
    const variantsAvailable = [
        '100',
        '300',
        'regular',
        '500',
        '700',
        '800',
        '100italic',
        '300italic',
        'italic',
        '500italic',
        '700italic',
        '800italic',
    ];

    const [fonts, set] = createSignal<GoogleFont[]>([]);

    const fetch = async () => {
        const items = await fetchGoogleFontService();
        if (fonts().length) {
            unloadFontHeaders();
        }

        loadFontHeaders(items);
    };

    const loadFontHeader = (family: string) => {
        const id = `font-${family.replace(/\s+/g, '-')}`;

        // no cargar dos veces
        if (document.getElementById(id)) {
            return;
        }

        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}&display=swap`;
        document.head.appendChild(link);
    };

    const loadFontHeaders = (fonts: Array<GoogleFont>) => {
        // Agregamos las fuentes una por una al head de la página
        fonts.forEach(({ family }: GoogleFont) => {
            loadFontHeader(family);
        });

        // Las agregamos al estado de fuentes
        set(fonts);
    };

    const unloadFontHeader = (family: string) => {
        const id = `font-${family.replace(/\s+/g, '-')}`;
        const link = document.getElementById(id);
        if (link) {
            link.remove();
        }
    };

    const unloadFontHeaders = () => {
        // Eliminamos las fuentes ya cargadas una por una
        fonts().forEach(({ family }: GoogleFont) => {
            unloadFontHeader(family);
        });

        // Limpiamos el estado
        set([]);
    };

    const variant2style = (variant: string): JSX.CSSProperties => {
        const splitted = variant.split('italic');
        const weight = splitted[0];
        const style = weight === '' || splitted.length > 1 ? 'italic' : (splitted[1] ?? '');

        return {
            'font-weight': weight,
            'font-style': style,
        };
    };

    const variant2desc = (variant: string): string => {
        switch (variant) {
            case '100':
                return 'Thin';
            case '300':
                return 'Light';
            case 'regular':
                return 'Regular';
            case '500':
                return 'Medium';
            case '700':
                return 'Bold';
            case '800':
                return 'Extra Bold';
            case '100italic':
                return 'Thin Italic';
            case '300italic':
                return 'Light Italic';
            case 'italic':
                return 'Italic';
            case '500italic':
                return 'Medium Italic';
            case '700italic':
                return 'Bold Italic';
            case '800italic':
                return 'Extra Bold Italic';
        }

        return '';
    };

    return (
        <GoogleFontsContext.Provider value={{ variantsAvailable, fonts, fetch, variant2style, variant2desc }}>
            {props.children}
        </GoogleFontsContext.Provider>
    );
}
