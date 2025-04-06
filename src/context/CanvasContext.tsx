import { CanvasElement } from '@/types';
import { createContext, createSignal, JSX, Setter } from 'solid-js';

export enum SideBarPanelEnum {
    None,
    Text,
    Elements,
    Photos,
}

interface CanvasContextType {
    canvasElement: () => Map<number, CanvasElement>;
    setCanvasElement: Setter<Map<number, CanvasElement>>;
    canvasPositions: () => Map<number, CanvasElement>;
    setCanvasPositions: Setter<Map<number, CanvasElement>>;
    addElement: (element: CanvasElement) => void;
    removeElement: (id: number) => void;
    updateElement: (updatedElement: CanvasElement) => void;
    sidebarPanel: () => SideBarPanelEnum;
    setSideBarPanel: (panel: SideBarPanelEnum) => void;
}

// Crear el contexto
export const CanvasContext = createContext<CanvasContextType>();

interface CanvasProviderProps {
    children: JSX.Element;
}
export function CanvasProvider(props: CanvasProviderProps) {
    // Signals
    const [canvasElement, setCanvasElement] = createSignal<Map<number, CanvasElement>>(new Map());
    const [canvasPositions, setCanvasPositions] = createSignal<Map<number, CanvasElement>>(new Map());
    const [sidebarPanel, setSideBarPanel] = createSignal(SideBarPanelEnum.None);

    // Callbacks
    const addElement = (element: CanvasElement) => {
        setCanvasElement((prevElements) => new Map(prevElements).set(element.id, element));
    };

    const removeElement = (id: number) => {
        setCanvasElement((prevElements) => {
            const newElements = new Map(prevElements);
            newElements.delete(id);
            return newElements;
        });
    };

    const updateElement = (updatedElement: CanvasElement) => {
        setCanvasElement((prevElements) => new Map(prevElements).set(updatedElement.id, updatedElement));
    };

    return (
        <CanvasContext.Provider
            value={{
                canvasElement,
                setCanvasElement,
                canvasPositions,
                setCanvasPositions,
                addElement,
                removeElement,
                updateElement,
                sidebarPanel,
                setSideBarPanel,
            }}
        >
            {props.children}
        </CanvasContext.Provider>
    );
}
