
import { connectMenu } from 'react-instantsearch-dom';

const AlgoliaSelectMenu = connectMenu(({ items, name, key, className, onChange, value }) => (
    <select 
        key={key}
        className="p-2 rounded text-gray-800 text-sm font-bold bg-gray-300 focus:outline-none cursor-pointer"
        name={name}
        onChange={onChange} 
        value={value}
    >
        <option value="">Select</option>
        {items.sort().map(item => (
            <option 
                key={`option-${name}-${item.label}`}
                className={className}
                value={item.value}>{item.label}</option>
            )
        )}
    </select>
));

export default AlgoliaSelectMenu;