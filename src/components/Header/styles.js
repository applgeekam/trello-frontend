import { makeStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

export default makeStyles(theme => ({
  logotype: {
    color: "white",
    marginLeft: theme.spacing(0.6),
    paddingTop: theme.spacing(0.9),
    marginRight: theme.spacing(2.5),
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  buttonIcon: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  appBar: {
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    minHeight:48,
    // backgroundColor: "#faa043",
    backgroundColor:"#ffffff61"
    // backgroundColor:"#ffffff6b"
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight:48,
  },
  hide: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    justifyContent:"center"
  },
  search: {
    position: "relative",
    borderRadius: 25,
    paddingLeft: theme.spacing(2.5),
    width: 36,
    backgroundColor: fade(theme.palette.common.black, 0),
    transition: theme.transitions.create(["background-color", "width"]),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: fade(theme.palette.common.black, 0.08),
    },
  },
  searchFocused: {
    backgroundColor: fade(theme.palette.common.black, 0.08),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 250,
    },
  },
  searchIcon: {
    width: 36,
    right: 0,
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: theme.transitions.create("right"),
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchIconOpened: {
    right: theme.spacing(1.25),
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    height: 36,
    padding: 0,
    paddingRight: 36 + theme.spacing(1.25),
    width: "100%",
  },
  messageContent: {
    display: "flex",
    flexDirection: "column",
  },
  headerMenu: {
    marginTop: theme.spacing(4.5),
    height: 500,
  },
  headerMenuList: {
    display: "flex",
    flexDirection: "column",
  },
  headerMenuItem: {
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light,
    },
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
  avatarSquelon: {
    marginLeft: theme.spacing(2),
  },
  headerIcon: {
    fontSize: 28,
    color: "rgba(255, 255, 255, 1)",
  },
  headerIconCollapse: {
    color: "white",
  },
  profileMenu: {
    minWidth: 265,
    boxShadow: " 0 0 4px 0 black"
  },
  profileMenuUser: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  profileMenuItem: {
    color: theme.palette.text.hint,
  },
  profileMenuIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.hint,
    '&:hover': {
      color: theme.palette.primary.main,
    }
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
  profileMenuEmail: {
    fontSize: 12,
    textDecoration: "none",
  },
  messageNotification: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light,
    },
  },
  messageNotificationSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  messageNotificationBodySide: {
    alignItems: "flex-start",
    marginRight: 0,
  },
  sendMessageButton: {
    margin: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textTransform: "none",
  },
  sendButtonIcon: {
    marginLeft: theme.spacing(2),
  },
  purchaseBtn: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    marginRight: theme.spacing(3)
  },
  headerMenuAddButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
    backgroundColor: "#DB7723",
  },
  headerMenuAddButtonIcon: {
    fontSize: 28,
    color: "rgba(255, 255, 255, 1)",
  },
  buttonBoard: {
    color: "white",
    backgroundColor: "#DB7723",
    '&:hover': {
      backgroundColor: "rgba(219, 112, 24, 0.35)",
    }
  },
  buttonTeam: {
    marginLeft: theme.spacing(2),
    color: "white",
    backgroundColor: "#DB7723",
    '&:hover': {
      backgroundColor: "rgba(219, 112, 24, 0.35)",
    }
  },
  textDescTeam:{
    fontSize:12,
  },
  card: {
    maxWidth: 400,
  },
  cardContent:{
    padding:theme.spacing(1.2),
    paddingBottom:"9.5px !important",
  },
  media: {
    height: 190,
    maxWidth: 200,
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  buttonAddBoard: {
    marginTop: theme.spacing(2),

  },
  sousMenuSubHeader:{
    backgroundColor : "#fff"
  }
}));
