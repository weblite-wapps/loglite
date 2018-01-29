import { createMuiTheme } from 'material-ui/styles'


export default createMuiTheme({
  overrides: {
    MuiButton: {
      raised: {
        backgroundColor: '#505050',
        fontSize: '13px',
        color: 'white',
        borderRadius: '0px',
        padding: '5px 10px',
        margin: '5px',
        minWidth: '5px',
        minHeight: '25px',
        textTransform: 'capitalize',
      },
    },
  },
})
