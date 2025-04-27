import { useGoogleFonts } from '@/hooks/useGoogleFonts';
import { Accessor, createEffect, createSignal, For } from 'solid-js';

type FontVariantPickerProps = {
    value: Accessor<string>;
    options: Accessor<Array<string>>;
    onChange: (value: string) => void;
};

export default function FontVariantPicker({ value, options, onChange }: FontVariantPickerProps) {
    const { variantsAvailable, variant2style, variant2desc } = useGoogleFonts();
    const [variants, set] = createSignal<Array<string>>([]);

    createEffect(() => {
        set(filterVariants(options()));
    });

    // createEffect(() => {
    //     variants().forEach((v: string) => {
    //         console.dir(variant2style(v));
    //     });
    // });

    const filterVariants = (variants: Array<string>) => {
        return variants.filter((variant: string) => variantsAvailable.includes(variant));
    };

    return (
        <div class="flex-1 border rounded px-2 py-1 flex justify-between items-center">
            <select
                class="w-full bg-transparent border-none focus:outline-none"
                value={value()}
                onChange={(e) => onChange(e?.target?.value || '')}
                style={variant2style(value())}
            >
                <For each={variants()}>
                    {(v, i) => (
                        <option data-index={i()} style={variant2style(v)} value={v}>
                            {variant2desc(v)}
                        </option>
                    )}
                </For>
            </select>
        </div>
    );
}
