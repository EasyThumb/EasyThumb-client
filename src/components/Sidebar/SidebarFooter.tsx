import { JSX } from 'solid-js';

interface SidebarFooterProps {
    children?: JSX.Element;
}

export function SidebarFooter(props: SidebarFooterProps) {
    return <div class="mt-auto px-4 py-3 text-sm text-gray-400 border-t border-gray-700">{props.children}</div>;
}
