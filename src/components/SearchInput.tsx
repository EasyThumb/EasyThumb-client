import { debounce } from 'lodash';
import Search from 'lucide-solid/icons/search';

import { createSignal } from 'solid-js';
import Input from './Input';

interface SearchInputProps {
    placeHolder: string;
    onSearch: (value: string) => void;
}

export default function SearchInput(props: SearchInputProps) {
    const [query, setQuery] = createSignal('');

    const debouncedSearch = debounce((value: string) => props.onSearch(value), 500);

    const handleChange = (e: InputEvent) => {
        const target = e.target as HTMLInputElement;
        setQuery(target.value);
        debouncedSearch(target.value);
    };

    return (
        <div class="relative w-full">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <Input
                type="text"
                value={query()}
                onInput={handleChange}
                placeholder={props.placeHolder}
                class="w-full pl-10 pr-4 h-10 rounded-full border border-neutral-300 focus:ring-2 focus:ring-neutral-500"
            />
        </div>
    );
}
