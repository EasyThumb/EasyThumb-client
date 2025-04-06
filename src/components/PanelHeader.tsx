import X from 'lucide-solid/icons/x';
import { Button } from './ui/button';

interface PanelHeaderProps {
    title: string;
    onClose: () => void;
}

export const PanelHeader = (props: PanelHeaderProps) => (
    <div class="mb-3 flex items-center justify-between lg:mb-4">
        <h3 class="text-xl font-semibold truncate">{props.title}</h3>
        <Button class="h-6 w-6 cursor-pointer" variant="ghost" size="icon" onClick={props.onClose}>
            <X class="h-6 w-6" />
        </Button>
    </div>
);
