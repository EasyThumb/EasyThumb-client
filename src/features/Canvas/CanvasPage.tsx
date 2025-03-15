import { Sidebar } from '@/components/Sidebar';
import { Content } from './components';

export function CanvasPage() {
    return (
        <div class="flex h-screen">
            <Sidebar />
            <Content />
        </div>
    );
}
