import { createMuiTheme } from 'material-ui/styles'

export default createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: '#505050',
        color: 'white',
        minHeight: '35px',
        minWidth: '35px',
        padding: '0px',
        borderRadius: '0px',
        margin: '0px',
        border: '0.5px solid white',
      },
      fab: {
        backgroundColor: '#505050',
        height: '60px',
        width: '60px',
      },
      disabled: {
        color: '#919191',
      },
    },
    MuiTab: {
      root: {
        height: '50px',
      },
    },
    MuiTabIndicator: {
      root: {
        height: '5px',
      },
    },
    MuiCircularProgress: {
      primaryColor: {
        color: 'white',
      },
    },
    MuiSvgIcon: {
      root: {
        color: 'white',
        height: '50px',
        width: '50px',
      },
    },
    MuiDivider: {
      default: {
        backgroundColor: '#000000',
      },
    },
    MuiListItem: {
      default: {
        paddingTop: '0px',
        paddingBottom: '0px',
      },
    },
  },
})
