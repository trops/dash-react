export const FormLabel = ({ title, textSize = null, fontWeight = 'font-medium'}) => {
    const textSizeCalc = textSize !== null ? textSize : 'text-base 2xl:text-lg';
    return (
        <label className={`${fontWeight} ${textSizeCalc} text-gray-300`}>{title}</label>
    );
};
