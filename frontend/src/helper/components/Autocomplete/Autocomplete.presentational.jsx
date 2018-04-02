import React from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'react-autocomplete'
// scssClasses
import scssClasses from './Autocomplete.scss'


const CustomizedAutocomplete = ({
  label, suggestions, inputValue, onInputValueChange, onSelect, onAdd,
}) => (
  <Autocomplete
    getItemValue={item => item.label}
    items={suggestions}
    renderItem={(item, isHighlighted) => (
      <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item._id}>
        {item.label}
      </div>
    )}
    renderInput={
      kind => (
        <div className={scssClasses.group}>
          <input
            {...kind}
            type="text"
            required
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                onAdd()
                ev.preventDefault()
              }
            }}
          />
          <span className={scssClasses.highlight} />
          <span className={scssClasses.bar} />
          <span className={scssClasses.label}>{label}</span>
        </div>
      )
    }
    wrapperStyle={{ zIndex: '1', width: '100%' }}
    value={inputValue}
    onChange={onInputValueChange}
    onSelect={onSelect}
  />
)

CustomizedAutocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInputValueChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
}

export default CustomizedAutocomplete
