import { createMuiTheme } from "@material-ui/core/styles"
import { primary_color, secondary_color, accent_color } from "./_color"

export default createMuiTheme({
  palette: {
    primary: {
      light: accent_color,
      main: secondary_color,
      dark: primary_color,
      contrastText: "#fff",
    },
    secondary: {
      light: "#000000",
      main: "#000000",
      dark: "#000000",
      contrastText: "#fff",
    },
  },
  overrides: {
    MuiTypography: {
      display1: {
        color: "#000000",
        fontWeight: "500",
      },
      display2: {
        fontWeight: "100",
        color: primary_color,
      },
      headline: {
        color: secondary_color,
        textTransform: "uppercase",
        margin: "5px",
        textAlign: "center",
        fontSize: "27px",
        width: "165px",
      },
    },
    MuiFab: {
      root: {
        backgroundColor: primary_color,
        color: "white",
        height: "60px",
        width: "60px",
      },
    },
    MuiIconButton: {
      root: {
        height: "30px",
        width: "30px",
        padding: "0",
      },
    },
    MuiTab: {
      root: {
        height: "50px",
      },
    },
    MuiTabIndicator: {
      root: {
        height: "5px",
      },
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: "white",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#000000",
      },
      light: {
        backgroundColor: accent_color,
      },
      inset: {
        marginRight: "20px",
        marginLeft: "20px",
      },
    },
    MuiListItem: {
      default: {
        paddingTop: "0px",
        paddingBottom: "0px",
      },
      dense: {
        paddingLeft: "10px",
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        paddingRight: "10px",
      },
    },
    MuiBadge: {
      badge: {
        backgroundColor: "#a3cb38",
        color: "#3d3d3d",
      },
    },
  },
})
