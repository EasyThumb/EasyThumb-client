import { JSX, splitProps } from 'solid-js';

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
    const [local, others] = splitProps(props, ['class']);

    return (
        <input
            {...others}
            class={`border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none 
                focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition-all 
                disabled:opacity-50 disabled:cursor-not-allowed ${local.class ?? ''}`}
        />
    );
}
