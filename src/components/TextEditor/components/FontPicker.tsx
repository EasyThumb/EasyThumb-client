import GenericComboBox from '@/components/GenericComboBox';
import { useGoogleFonts } from '@/hooks/useGoogleFonts';
import { GoogleFont } from '@/services/googleFontsService';
import { Accessor, onMount } from 'solid-js';

type FontPickerProps = {
    value: Accessor<GoogleFont>;
    onChange?: (value: GoogleFont) => void;
};

export default function FontPicker({ value, onChange }: FontPickerProps) {
    const { fonts, fetch } = useGoogleFonts();

    onMount(() => {
        try {
            if (fonts().length == 0) {
                fetch();
            }
        } catch (err) {
            console.error('Error cargando fuentes de Google Fonts:', err);
        }
    });

    return (
        <div class="space-y-4">
            <GenericComboBox
                placeholder="Search font..."
                options={fonts}
                optionValue={(opt?: GoogleFont) => opt?.family || ''}
                optionLabel={(opt?: GoogleFont) => opt?.family || ''}
                optionStyle={(opt?: GoogleFont) => ({
                    'font-family': opt ? `'${opt.family}', ${opt.category}` : '',
                })}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
