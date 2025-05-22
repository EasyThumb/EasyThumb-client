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
    deleteElement: (id: number) => void;
    updateElement: (updatedElement: CanvasElement) => void;
    getSelectedElement: () => CanvasElement | undefined;
    zoom: Accessor<number>;
    setZoom: Setter<number>;
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
    const [zoom, setZoom] = createSignal<number>(1);

    // Callbacks
    function addElement(element: CanvasElement) {
        setCanvasElement((prevElements) => new Map(prevElements).set(element.id, element));
    }

    function deleteElement(id: number) {
        setCanvasElement((prevElements) => {
            const newElements = new Map(prevElements);
            newElements.delete(id);
            return newElements;
        });
    }

    function updateElement(updatedElement: CanvasElement) {
        setCanvasElement((prevElements) => new Map(prevElements).set(updatedElement.id, updatedElement));
    }

    function setSelected(id: number | null) {
        setSelectedElement(id);
    }

    function getSelectedElement(): CanvasElement | undefined {
        return canvasElement().get(selectedElement() || 0);
    }

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
                deleteElement,
                updateElement,
                getSelectedElement,
                zoom,
                setZoom,
                /** Side bar */
                sidebarPanel,
                setSideBarPanel,
            }}
        >
            {props.children}
        </CanvasContext.Provider>
    );
}
