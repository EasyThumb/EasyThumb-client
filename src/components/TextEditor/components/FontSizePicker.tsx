import { Accessor, createSignal, For } from 'solid-js';

type FontSizePickerProps = {
    value: Accessor<string>;
    onChange: (value: string) => void;
};

// De 10 a 60, sumando de 2 en 2
const sizesAvailable = Array.from({ length: (60 - 10) / 2 + 1 }, (_, i) => `${10 + i * 2}`);

export default function FontSizePicker({ value, onChange }: FontSizePickerProps) {
    const [sizes] = createSignal<Array<string>>(sizesAvailable);

    return (
        <div class="w-20 border rounded px-2 py-1 flex justify-between items-center">
            <select
                class="w-full bg-transparent border-none focus:outline-none"
                value={value()}
                onChange={(e) => onChange(e?.target?.value || '')}
            >
                <For each={sizes()}>
                    {(v, i) => (
                        <option data-index={i()} value={v}>
                            {`${v}px`}
                        </option>
                    )}
                </For>
            </select>
        </div>
    );
}
