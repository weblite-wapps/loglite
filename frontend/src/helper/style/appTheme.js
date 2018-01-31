import { createMuiTheme } from 'material-ui/styles'

export default createMuiTheme({
  overrides: {
    MuiTypography: {
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
    },
    MuiButton: {
      fab: {
        backgroundColor: '#505050',
        color: 'white',
        height: '60px',
        width: '60px',
      },
    },
    MuiIconButton: {
      root: {
        height: '30px',
        width: '30px',
        marginTop: '10px',
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
    MuiDivider: {
      default: {
        backgroundColor: '#000000',
      },
      light: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      inset: {
        marginRight: '20px',
        marginLeft: '20px',
      },
    },
    MuiListItem: {
      default: {
        paddingTop: '0px',
        paddingBottom: '0px',
      },
      dense: {
        paddingLeft: '30px',
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        paddingRight: '20px',
      },
    },
  },
})
