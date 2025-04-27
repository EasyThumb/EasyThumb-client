import { Accessor, createEffect, createMemo, createSignal, For, JSX, onCleanup, onMount, Show } from 'solid-js';

type GenericComboBoxProps<T> = {
    options: Accessor<Array<T>>;
    optionLabel: (option?: T) => string;
    optionValue: (option?: T) => string;
    optionStyle?: (option?: T) => JSX.CSSProperties;

    value: Accessor<T>;
    onChange?: (value: T) => void;

    placeholder?: string;
    height?: number;
};

export default function GenericComboBox<T>({
    options,
    optionLabel,
    optionValue,
    optionStyle,
    value,
    onChange,
    placeholder = 'Select option...',
    height = 300,
}: GenericComboBoxProps<T>) {
    let listRef: HTMLDivElement | undefined;
    let inputRef: HTMLInputElement | undefined;

    const [open, setOpen] = createSignal(false);
    const [search, setSearch] = createSignal('');
    const [highlightedIndex, setHighlightedIndex] = createSignal(0);

    const resolvedOptions = createMemo(() => options());
    const filtered = createMemo(() => {
        return resolvedOptions().filter((opt: T) => {
            const label = optionLabel(opt);
            return label.toLowerCase().includes(search().toLowerCase());
        });
    });

    // Scroll al seleccionado al abrir
    createEffect(() => {
        if (open() && value) {
            const index = filtered().findIndex((opt) => optionValue(opt) === optionValue(value()));
            if (index !== -1) {
                setHighlightedIndex(index);
                queueMicrotask(() => scrollToHighlighted());
            }
        }
    });

    const selectItem = (item: T) => {
        if (onChange) {
            onChange(item);
        }

        setOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (!(e.target as HTMLElement).closest('.combo-box')) {
            setOpen(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        const count = filtered().length;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
            setHighlightedIndex((i) => (i + 1) % count);
            scrollToHighlighted();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setOpen(true);
            setHighlightedIndex((i) => (i - 1 + count) % count);
            scrollToHighlighted();
        } else if (e.key === 'Enter') {
            if (open()) {
                e.preventDefault();
                const item = filtered()[highlightedIndex()];
                if (item) {
                    selectItem(item);
                }
            }
        } else if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    const scrollToHighlighted = () => {
        if (listRef) {
            const listChildren = listRef.querySelectorAll('div[data-index]');
            const el = listChildren[highlightedIndex()] as HTMLElement;
            el?.scrollIntoView({ block: 'nearest' });
        }
    };

    document.addEventListener('click', handleClickOutside);
    onCleanup(() => document.removeEventListener('click', handleClickOutside));

    onMount(() => {
        inputRef?.addEventListener('keydown', handleKeyDown);
    });

    return (
        <div class="combo-box relative w-64">
            {/* Trigger */}
            <div
                class="flex items-center border border-gray-300 rounded-md px-3 py-2 shadow-sm bg-white cursor-pointer"
                onClick={() => setOpen(!open())}
            >
                <span class="text-gray-700 text-sm truncate" style={optionStyle?.(value()) || {}}>
                    {optionLabel(value()) || placeholder}
                </span>
                <svg class="ml-auto w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Popup */}
            <Show when={open()}>
                <div
                    class="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg"
                    style={{
                        'overflow-y': 'auto',
                    }}
                >
                    {/* Search Input */}
                    <div class="sticky top-0 z-10 bg-white p-2 border-b border-gray-200">
                        <input
                            class="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Buscar..."
                            value={search()}
                            onInput={(e) => {
                                e.stopPropagation();
                                setSearch(e.currentTarget.value);
                                setHighlightedIndex(0);
                            }}
                            ref={(el) => (inputRef = el)}
                        />
                    </div>

                    {/* Lista */}
                    <div
                        ref={listRef}
                        class="overflow-y-auto"
                        style={{ 'max-height': `${height - 42}px` }} // Ajusta 42 si tu input mide más/menos
                    >
                        <For each={filtered()}>
                            {(v, i) => (
                                <div
                                    data-index={i()}
                                    class={`px-4 py-2 cursor-pointer ${
                                        highlightedIndex() === i() ? 'bg-gray-100 font-medium' : ''
                                    }`}
                                    style={optionStyle?.(v) || {}}
                                    onClick={() => selectItem(v)}
                                    onMouseEnter={() => setHighlightedIndex(i())}
                                >
                                    {optionLabel(v)}
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </Show>
        </div>
    );
}
