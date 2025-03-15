import { JSX } from 'solid-js';

interface SidebarHeaderProps {
    children?: JSX.Element;
}

export function SidebarHeader(props: SidebarHeaderProps) {
    return <div class="px-4 py-3 text-lg font-semibold border-b border-gray-700">{props.children}</div>;
}
