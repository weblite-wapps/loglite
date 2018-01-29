import { createMuiTheme } from 'material-ui/styles'


export default createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: '#919191',
        color: 'white',
        borderRadius: '0px',
        padding: '2px 15px',
        margin: '0px 10px 0px 5px',
        textTransform: 'capitalize',
      },
      dense: {
        backgroundColor: '#505050',
        color: 'white',
        borderRadius: '0px',
        padding: '2px 15px',
        margin: '0px',
        minWidth: '5px',
        minHeight: '37px',
      },
    },
  },
})
