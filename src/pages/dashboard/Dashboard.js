import React, {useEffect, useState} from "react";
import {
    useHistory, useLocation,
    useParams, useRouteMatch
} from "react-router-dom";

import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import { MoreVert as MenuIcon} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import SubBoardMenu from "../../components/SmallComponent/SubBoardMenu";
import GroupAvatars from "../../components/TiniComponents/GroupAvatars";
import FormControl from "@material-ui/core/FormControl";
import { ResizableInput} from "./components/Components";
import {useAxiosState} from "../../context/AxiosContext";
import {URLS} from "../../Module/http";
import {useDashboardDispatch} from "../../context/DashboardContext";
import Skeleton from "@material-ui/lab/Skeleton";
import {useNotificationDispatch} from "../../context/NotificationContext";
import Loader from "../../components/Loader";
import {signOut, useUserDispatch, useUserState} from "../../context/UserAuthContext";
import CardContent from "@material-ui/core/CardContent";
import notFoundLogo from "../../images/notfound.svg";
import warningLogo from "../../images/warning.svg";
import CardMedia from "@material-ui/core/CardMedia";
import {useMatchWithRedirect} from "../../context/GlobalHooks";
import {resetAllLocalAndContextOnLogout, setItemInLocalStorage} from "../../Module/biblio";


// Todo: Use an sidebar for show menu board

export default function Dashboard() {

    let classes = useStyles()
    let http = useAxiosState()
    const setDatas = useDashboardDispatch()
    // Todo use this name anywhere in the project
    // const authDispatch = useUserDispatch()
    let { id } = useParams()
    let history = useHistory()
    let location = useLocation()
    let { isAuthenticated } = useUserState();
    const matchWithRedirect = useMatchWithRedirect()

    const [aboutMenu, setAboutMenu] = useState(null)
    const [board, setBoard] = useState({})
    const [loading, setLoading] = useState(false)
    const [OnUpdateName, handleUpdateName] = useState(false)
    const displayNotification = useNotificationDispatch()
    const [name, setName] = useState("")
    const [errors, setErrors] = useState({
        error: false,
        message:"",
        image:notFoundLogo,
        action:"",
        callback: () => {}
    })

    // Todo use route match to check if user is in correct url, if not, send it to not found page

    useEffect(() =>{
        if (isAuthenticated === false && matchWithRedirect === null)
        {
            history.push('/login')
        }
        if (isAuthenticated === true) {
            setLoading(true)
            loadBoard()
        }
    }, [id])

    const updateName = () => {
        handleUpdateName(false)
        if (name.length <= 0 || name === board.name)
        {
            setName(board.name)
        }
        else
        {
            http.post(URLS.updateBoardName, {
                id: board.id,
                name,
            })
                .then((response) => {
                    setDatas(response.data)
                    loadBoard()
                })
                .catch((err) => {
                    setName(board.name)
                    displayNotification("Board name change failed. Check your connection and try again.", 'warning')
                })
        }
    }

    const loadBoard = () => {
        http.get(URLS.aboutBoard + id, {
            params: {
                id,
            }
        })
            .then((response) => {
                let { data : { board }} = response
                if (board === null)
                {
                    setErrors({
                        ...errors,
                        error: true,
                        message: "This board don't exist no more. Try to open another please.",
                        action: null,
                    })
                }
                else
                {
                    setBoard(board)
                    setName(board.name)
                    setErrors({
                        ...errors,
                        error: false
                    })
                }
                setLoading(false)
            })
            .catch((error) => {
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            // Todo do like this anywhere
                            // When the user is not auth... but is logged in front
                            setItemInLocalStorage('intented-route', window.location.href)
                            resetAllLocalAndContextOnLogout(useUserDispatch, location)
                            break
                        case 403:
                            // When the user try to access a board that he doesn't have access to
                            setErrors({
                                ...errors,
                                error: true,
                                image: warningLogo,
                                message: "Wait... You may don't have access to this board. Try to open another board please.",
                                action: null,
                            })
                            break
                        case 404:
                            // When the user try to access a board that dont exist
                            setErrors({
                                ...errors,
                                error: true,
                                image: warningLogo,
                                message: "Something goes wrong. This board don't exist. Try to open another board please.",
                                action: null,
                            })
                            break
                        case 422:
                            // When the user send bad id like papa89
                            setErrors({
                                ...errors,
                                error: true,
                                image: warningLogo,
                                message: "Something goes wrong. This board may not exist. if this error persist, try to open another please",
                                action: null,
                            })
                            break
                        default :
                            // By default
                            setErrors({
                                ...errors,
                                error: true,
                                image: warningLogo,
                                message: "Something goes wrong. Try to open another please",
                                action: null,
                            })
                            break
                    }
                    setLoading(false)
                }

            })
    }

    return (
      <>
          { loading ? <Loader/> :
              <>
                  {errors.error ? <div className={classes.showErrorRoot} ><ShowError info={errors}/></div> :
                      <Grid
                          container
                          className={classes.gridParent}
                      >
                          <Grid item className={classes.gridBar} >
                              <AppBar position="static" elevation={0} className={classes.hearderRoot}>
                                  <Toolbar className={classes.toolbar}>
                                      <div>
                                          {
                                              OnUpdateName  ?
                                                  <FormControl className={classes.margin} >
                                                      <ResizableInput
                                                          autoFocus={true}
                                                          size={name.length}
                                                          id="modify-board-name-input"
                                                          value={name}
                                                          onChange={(event => setName(event.target.value))}
                                                          onBlur={() => updateName()} />
                                                  </FormControl>
                                                  :
                                                  <Typography variant="h4" className={classes.boardName} onClick={() => handleUpdateName(true)} >
                                                      {board.name}
                                                  </Typography>
                                          }
                                      </div>
                                      <Divider orientation="vertical" flexItem className={classes.divider} />
                                      { loading ? <div className={classNames(classes.team)}><Skeleton variant="rect" width={210} height={38} animation={"wave"}/></div> :
                                          <div className={classNames(classes.team)}>
                                              <Button
                                                  variant="contained"
                                                  color="primary"
                                                  size="medium"
                                                  disableElevation
                                                  className={classes.buttonBoard}
                                                  aria-controls="about-sub-board-menu"
                                                  onClick={(e) => setAboutMenu(e.currentTarget)}
                                                  disabled={loading}
                                              >
                                                  {board.team === undefined ? "Personal" : board.team}
                                              </Button>
                                              <GroupAvatars classes={classes.teamAvatar}/>
                                              <Button
                                                  variant="contained"
                                                  color="primary"
                                                  size="medium"
                                                  disableElevation
                                                  className={classes.buttonBoard}
                                              >
                                                  Invite
                                              </Button>
                                          </div>}
                                      <Button
                                          variant="contained"
                                          color="primary"
                                          size="medium"
                                          disableElevation
                                          endIcon={<MenuIcon className={classes.buttonBoardIcon}/>}
                                          className={classes.buttonBoard}
                                          aria-controls="about-sub-board-menu"
                                          onClick={(e) => setAboutMenu(e.currentTarget)}
                                          disabled={loading}
                                      >
                                          About this board
                                      </Button>
                                      <SubBoardMenu aboutMenu={aboutMenu} setAboutMenu={setAboutMenu} classes={classes} />
                                  </Toolbar>
                              </AppBar>
                          </Grid>
                          <Grid item className={classes.gridContainer} >
                              <div>Hello !</div>
                          </Grid>
                      </Grid>
                  }
              </>
          }
      </>
    );

}

function ShowError(props)
{
    let classes = useStyles()
    let { info } = props

    return  (
        <div className={classes.card}>
            <CardMedia
                className={classes.media}
                image={info.image}
                title="Error image "
                component="img"
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" color="secondary" component="p" className={classNames({[classes.cardText] : info.action !== null})}>
                    {info.message}
                </Typography>
                { info.action !== null && <Button variant="contained"
                         color="primary"
                         size="large"
                         fullWidth
                         className={classes.buttonAddBoard}
                         onClick={() => info.callback()}
                >{info.action}</Button>}
            </CardContent>
        </div>
    )

}
