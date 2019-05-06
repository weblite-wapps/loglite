import { secondary_color } from './_color'

export default () => ({
  container: {
    margin: '10px 1px',
    display: 'flex',
    flexWrap: 'wrap',
    userSelect: 'none',
  },
  textField: {
    margin: 'auto',
    width: '90%',
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
