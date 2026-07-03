export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block text-sm font-semibold text-navy ` + className}>
            {value ? value : children}
        </label>
    );
}
