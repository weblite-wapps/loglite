import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import { withStyles } from 'material-ui/styles'


function renderInput(inputProps) {
  const { classes, autoFocus, inputValue, onInputValueChange, ...other } = inputProps
  return (
    <TextField
      autoFocus={autoFocus}
      className={classes.textField}
      value={inputValue}
      onChange={onInputValueChange}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  )
}

function renderSuggestion(params) {
  const { suggestion, index, itemProps, theme, highlightedIndex, selectedItem } = params
  const isHighlighted = highlightedIndex === index
  const isSelected = selectedItem === suggestion.label
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected
          ? theme.typography.fontWeightMedium
          : theme.typography.fontWeightRegular,
      }}
    >
      {suggestion.label}
    </MenuItem>
  )
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;
  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  )
}

const getSuggestions = (suggestions, tags) => suggestions.filter(suggestion =>
    R.reduce(R.and, true, R.map(tag => tag.label !== suggestion.label , tags)))


const styles = {
  container: {
    flexGrow: 1,
    height: 0,
    zIndex: 5,
  },
  textField: {
    width: '100%',
  },
}

class Autocomplete extends React.Component {
  render() {
    const { suggestions, tags, inputValue, onInputValueChange, onChange, selectedItem, classes, theme } = this.props
    return (
      <Downshift
        inputValue={inputValue}
        onInputValueChange={onInputValueChange}
        selectedItem={selectedItem}
        onChange={onChange}
      >
        {({ getInputProps, getItemProps, isOpen, selectedItem, highlightedIndex }) => (
          <div className={classes.container}>
            {renderInput(
              getInputProps({
                inputValue,
                onInputValueChange,
                classes,
                placeholder: 'Search',
                id: 'integration-downshift',
              }),
            )}
            {isOpen
              ? renderSuggestionsContainer({
                  children: getSuggestions(suggestions, tags).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      theme,
                      itemProps: getItemProps({ item: suggestion.label }),
                      highlightedIndex,
                      selectedItem,
                    }),
                  ),
                })
              : null}
          </div>
        )}
      </Downshift>
    )
  }
}

Autocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Autocomplete)



 
