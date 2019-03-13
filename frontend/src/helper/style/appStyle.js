import { secondary_color } from './_color'

export default theme => ({
  container: {
    margin: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    userSelect: 'none',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  textFieldFormLabel: {
    color: secondary_color, 
  },
  textFieldInkbar: {
    '&:after': {
      backgroundColor: secondary_color,
    },
  },
})
