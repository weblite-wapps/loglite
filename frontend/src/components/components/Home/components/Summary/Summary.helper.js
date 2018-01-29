// modules
import { createMuiTheme } from 'material-ui/styles'


export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: '#cfcfcf',
        color: 'white',
        minHeight: '40px',
        minWidth: '40px',
        padding: '0px',
        borderRadius: '0px',
        margin: '5px',
      },
    },
    MuiSvgIcon: {
      root: {
        width: '40px',
        height: '40px',
      },
    },
  },
})

export const styles = {
  display1: {
    color: '#000000',
    fontWeight: '500',
  },
  display2: {
    fontWeight: '100',
    color: '#505050',
  },
  headline: {
    color: '#919191',
    textTransform: 'uppercase',
    margin: '5px',
    textAlign: 'center',
    fontSize: '27px',
    width: '165px',
  },
}
