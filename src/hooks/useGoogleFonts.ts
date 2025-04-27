import { useContext } from 'solid-js';
import { GoogleFontsContext } from '@/context/GoogleFontsContext';

export function useGoogleFonts() {
    const context = useContext(GoogleFontsContext);
    if (!context) {
        throw new Error('useGoogleFonts debe estar dentro de <GoogleFontsProvider>');
    }
    return context;
}
