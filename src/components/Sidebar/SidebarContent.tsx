import { JSX } from 'solid-js';

interface SidebarContentProps {
    children?: JSX.Element;
}

export function SidebarContent(props: SidebarContentProps) {
    return <nav class="flex flex-col p-2 space-y-1">{props.children}</nav>;
}
