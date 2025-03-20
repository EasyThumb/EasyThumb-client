import { createContext, createSignal, JSX } from 'solid-js';
export enum SideBarPanelEnum {
    None,
    Text,
    Elements,
    Photos,
}

interface CanvasContextType {
    sidebarPanel: () => SideBarPanelEnum;
    setSideBarPanel: (panel: SideBarPanelEnum) => void;
}

// Crear el contexto
export const CanvasContext = createContext<CanvasContextType>();

interface CanvasProviderProps {
    children: JSX.Element;
}
export function CanvasProvider(props: CanvasProviderProps) {
    const [sidebarPanel, setSideBarPanel] = createSignal(SideBarPanelEnum.None);

    return <CanvasContext.Provider value={{ sidebarPanel, setSideBarPanel }}>{props.children}</CanvasContext.Provider>;
}
