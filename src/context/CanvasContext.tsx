import { GoogleFont } from '@/services/googleFontsService';
import { CanvasElement } from '@/types';
import { Accessor, createContext, createSignal, JSX, Setter } from 'solid-js';

export enum SideBarPanelEnum {
    None,
    Text,
    Elements,
    Photos,
}

interface CanvasContextType {
    /** Google Fonts */
    googleFonts: () => GoogleFont[];
    setGoogleFonts: Setter<GoogleFont[]>;
    /** Canvas */
    canvasElement: Accessor<Map<number, CanvasElement>>;
    selectedElement: Accessor<number | null>;
    setSelected: (id: number | null) => void;
    canvasPositions: () => Map<number, CanvasElement>;
    setCanvasPositions: Setter<Map<number, CanvasElement>>;
    addElement: (element: CanvasElement) => void;
    removeElement: (id: number) => void;
    updateElement: (updatedElement: CanvasElement) => void;
    /** Sidebar */
    sidebarPanel: () => SideBarPanelEnum;
    setSideBarPanel: (panel: SideBarPanelEnum) => void;
}

export const CanvasContext = createContext<CanvasContextType>();

interface CanvasProviderProps {
    children: JSX.Element;
}
export function CanvasProvider(props: CanvasProviderProps) {
    // Signals
    const [googleFonts, setGoogleFonts] = createSignal<GoogleFont[]>([]);
    const [canvasElement, setCanvasElement] = createSignal<Map<number, CanvasElement>>(new Map());
    const [selectedElement, setSelectedElement] = createSignal<number | null>(null);
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

    const setSelected = (id: number | null) => {
        setSelectedElement(id);
    };

    return (
        <CanvasContext.Provider
            value={{
                /** Google Fonts */
                googleFonts,
                setGoogleFonts,
                /** Canvas */
                canvasElement,
                selectedElement,
                setSelected,
                canvasPositions,
                setCanvasPositions,
                addElement,
                removeElement,
                updateElement,
                /** Side bar */
                sidebarPanel,
                setSideBarPanel,
            }}
        >
            {props.children}
        </CanvasContext.Provider>
    );
}
