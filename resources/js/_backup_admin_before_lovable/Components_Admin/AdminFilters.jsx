import TextInput from '@/Components/TextInput';

export default function AdminFilters({
    filters,
    onFilterChange,
    children
}) {
    return (
        <div className="card w-100 mb-4">
            <div className="card-body">
                <div className="row g-3">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function AdminFilterInput({
    placeholder,
    value,
    onChange,
    label,
    colSpan = 'md:col-span-3'
}) {
    return (
        <div className="col-12 col-md-3">
            {label && (
                <label className="form-label">
                    {label}
                </label>
            )}
            <TextInput
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="form-control"
            />
        </div>
    );
}

export function AdminFilterSelect({
    options,
    value,
    onChange,
    label,
    colSpan = 'md:col-span-3',
    disabled = false
}) {
    return (
        <div className="col-12 col-md-3">
            {label && (
                <label className="form-label">
                    {label}
                </label>
            )}
            <select
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="form-select"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
