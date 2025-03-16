import { useContext } from 'solid-js';
import { CanvasContext } from '../context/CanvasContext';

export function useCanvasContext() {
    const context = useContext(CanvasContext);
    if (!context) {
        throw new Error('useCanvasContext debe estar dentro de <CanvasProvider>');
    }
    return context;
}
