import React, {useEffect, useState} from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button
} from "@material-ui/core";

import {
  Add,
  Dashboard as DashboardIcon,
    People as PeopleIcon,
} from "@material-ui/icons";


// styles
import useStyles from "./styles";

// components
import {Typography} from "../Wrappers";
import logo from "./trello.png"

// context

import Avatar from "@material-ui/core/Avatar";
import MenuProfil from "../SmallComponent/MenuProfil";
import MenuAddElement from "../SmallComponent/MenuAddElement";
import MenuBoard from "../SmallComponent/MenuBoard";
import MenuTeam from "../SmallComponent/MenuTeam/MenuTeam";
import Skeleton from "@material-ui/lab/Skeleton";
import Badge from "@material-ui/core/Badge";
import {NotificationsNone as NotificationsIcon} from "@material-ui/icons";



//Todo : Set a placeholder when the data is loading


export default function Header(props) {
    const classes = useStyles();

    // local
    const [teamMenu, setTeamMenu] = useState(null);
    const [addMenu, setAddMenu] = useState(null);
    const [boardMenu, setBoardMenu] = useState(null);
    const [profileMenu, setProfileMenu] = useState(null);
    const [messagesMenu, setMessagesMenu] = useState([]);

  const { isLoading, setCurrentBoard } = props

  return (
    <div>
        <div>
            <AppBar elevation={0} position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    disableElevation
                    disabled={isLoading}
                    startIcon={<DashboardIcon className={classes.buttonIcon}/>}
                    className={classes.buttonBoard}
                    aria-controls="board-menu"
                    onClick={e => setBoardMenu(e.currentTarget)}
                >
                    Boards
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    disableElevation
                    disabled={isLoading}
                    startIcon={<PeopleIcon className={classes.buttonIcon}/>}
                    className={classes.buttonTeam}
                    aria-controls="team-menu"
                    onClick={e => setTeamMenu(e.currentTarget)}
                >
                    Teams
                </Button>
                <div className={classes.grow} >
                    <Avatar alt="Remy Sharp" src={logo} />
                    <Typography variant="h6" weight="medium" className={classes.logotype}>
                        Trello
                    </Typography>
                </div>
                <IconButton
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.headerMenuAddButton}
                    disabled={isLoading}
                    onClick={e => setAddMenu(e.currentTarget)}
                >
                    <Add className={classes.headerMenuAddButtonIcon } />
                </IconButton>
                <IconButton
                    color="inherit"
                    aria-haspopup="true"
                    onClick={e => {
                        setMessagesMenu(e.currentTarget);
                    }}
                    className={classes.headerMenuButton}
                >
                    <Badge
                        badgeContent={messagesMenu.length}
                        color="secondary"
                    >
                        <NotificationsIcon classes={{ root: classes.headerIcon }} />
                    </Badge>
                </IconButton>
                {isLoading ?
                    <Skeleton variant="circle" className={classes.avatarSquelon}><Avatar/></Skeleton>
                    :
                    <IconButton
                        aria-haspopup="true"
                        color="inherit"
                        className={classes.headerMenuButton}
                        aria-controls="profile-menu"
                        onClick={e => setProfileMenu(e.currentTarget)}
                    >
                        <Avatar alt="Remy Sharp">JS</Avatar>
                    </IconButton>
                }
                <MenuBoard setDashboardBoard={setCurrentBoard} classes={classes} boardMenu={boardMenu} setBoardMenu={setBoardMenu} />
                <MenuTeam  classes={classes} teamMenu={teamMenu} setTeamMenu={setTeamMenu} />
                <MenuAddElement
                     classes={classes}
                     addMenu={addMenu}
                     setAddMenu={setAddMenu}
                />
                <MenuProfil classes={ classes} profileMenu={profileMenu} setProfileMenu={setProfileMenu} history={props.history}/>
            </Toolbar>
            </AppBar>
        </div>

    </div>
  );
}
