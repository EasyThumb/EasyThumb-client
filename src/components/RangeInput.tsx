import { Accessor } from 'solid-js';

type RangeInputProps = {
    label?: string;
    min?: number;
    max?: number;
    value: Accessor<number>;
    onChange: (value: number) => void;
};

export default function RangeInput({ label = '', min = 0, max = 100, value, onChange }: RangeInputProps) {
    return (
        <div>
            {label && <label class="block text-sm font-medium mb-1">{label}</label>}
            <div class="flex items-center space-x-2">
                <input
                    class="w-16 border rounded px-2 py-1 flex justify-between items-center"
                    type="number"
                    value={value()}
                    onInput={(e) => onChange(Number(e.target.value))}
                    min={min}
                    max={max}
                />
                <input
                    class="w-full"
                    type="range"
                    value={value()}
                    onInput={(e) => onChange(Number(e.target.value))}
                    min={min}
                    max={max}
                />
            </div>
        </div>
    );
}
