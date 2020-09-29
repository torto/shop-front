
import {
  withStyles,
  Theme,
  StyleRules,
  createStyles,
  TextField,
  fade,
} from "@material-ui/core";

export const CssTextField = withStyles({
  root: {
    "& .MuiInput-input": {
      color: "white",
    },
    "& .MuiInputLabel-shrink": {
      color: "rgba(255, 255, 255, .5)",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(255, 255, 255, .5)",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(255, 255, 255, .5)",
    },
    "&:hover .MuiInput-underline:before": {
      borderBottomColor: "rgba(255, 255, 255, .5)",
    },
  },
})(TextField);


const styles: (theme: Theme) => StyleRules<string> = (theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        margin: `0 ${theme.spacing(2)}px`,
        padding: `2px ${theme.spacing(2)}px`,
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
        "&:focus": {
          width: "50ch",
        },
      },
    },
  });

  export default styles;