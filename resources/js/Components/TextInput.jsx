import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const localRef = useRef(null);

    useEffect(() => {
        if (isFocused) {
            (ref || localRef).current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'h-11 rounded-2xl border-border bg-card text-sm text-navy shadow-sm focus:border-brand focus:ring-2 focus:ring-brand/20 ' +
                className
            }
            ref={ref ? ref : localRef}
        />
    );
});
