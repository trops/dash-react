export const InputText = ({ onChange, onKeyDown, name, value, type="text", padding = 'p-2', placeholder="", hasBorder = true , disabled = false, textSize = 'text-sm lg:text-base 2xl:text-lg', textColor = 'text-gray-600', bgColor = 'bg-gray-200' }) => {
    return (
        <input 
            type={type}
            name={name}
            value={value !== null ? value : ''}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={`${padding} rounded focus:outline-none outline-none border-0 ${textColor} ${bgColor} font-bold ${textSize} w-full ${hasBorder === false && 'border-none'}`} 
            disabled={disabled}
        />
    )
};