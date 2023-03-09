
import { connectMenu } from 'react-instantsearch-dom';
import { SelectMenu } from '../Form';

const AlgoliaMenuSelect = connectMenu(({ attribute, items, currentRefinement, refine, onChange = null, ...rest}) => {
  // current refinement could be the entire list...not sure if this is what we need to provide
  console.log('current refinement ', currentRefinement, items, rest);
  return (
    <SelectMenu
        name={attribute}
        selectedValue={currentRefinement}
        onChange={event => onChange === null ? refine(event.currentTarget.value) : onChange(event) }
      >
      <option value="">Select {attribute} </option>
      {items.map(item => (
        <option key={item.label} value={item.value}>
          {item.label}
        </option>
      ))}
    </SelectMenu>
  )
});

const AlgoliaMenuAlt = connectMenu(({ items, currentRefinement, refine }) => (
  <ul>
    {items.map(item => (
      <li key={item.value}>
        <a href="#" style={{ fontWeight: item.isRefined ? 'bold' : '' }}>
          {item.label} ({item.count})
        </a>
      </li>
    ))}
  </ul>
));

const AlgoliaMenu = connectMenu(({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.value}>
        {item.label} ({item.count})
      </li>
    ))}
  </ul>
));

export {
  AlgoliaMenu,
  AlgoliaMenuAlt,
  AlgoliaMenuSelect
}