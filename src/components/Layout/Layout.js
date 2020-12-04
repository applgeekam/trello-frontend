import React, {useEffect, useState} from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components


// pages
import Dashboard from "../../pages/dashboard/Dashboard";

// context

import Header from "../Header/Header";
import {log, showNotification, viewportSize} from "../../Module/biblio";
import {useDashboardDispatch} from "../../context/DashboardContext";
import {useModalState} from "../../context/ModalContext";
import {useAxiosState} from "../../context/AxiosContext";
import AddTeamModal from "../../pages/addTeam/AddTeamModal";
import AddBoardModal from "../../pages/addBoard/AddBoardModal";
import {DisplayNotification} from "../TiniComponents/Notifications";
import Modal from "../Modal";
import {useIsMountedRef, useNotification} from "../../context/GlobalContext";
import {TeamToUpdateProvider} from "../../context/TeamToUpdateContext";
import UpdateTeamModal from "../../pages/UpdateTeam/UpdateTeamModal";
import {WarningModal} from "../TiniComponents/WarningModal";

// Todo : Back sidebar for responsive site

function Layout(props) {

    const [isLoading, setLoading] = useState(true);
    let  [currentBoard, setCurrentBoard] = useState(null)
    const [ notification, displayNotification, resetNotification ] = useNotification()

    const classes = useStyles( { backgroundImage : getResizeBackgroundImage(currentBoard)});


    const modalState = useModalState()
    const setDatas = useDashboardDispatch()
    const http = useAxiosState()
    const isMountedRef = useIsMountedRef();


  useEffect(() => {
    http.get('/api/dashboard/info')
        .then((response) => {
            if (isMountedRef.current)
            {
                setDatas(response.data)
                console.log(response.data)
                setLoading(false)
            }
        })
        .catch((error) => {
            log('Error', error.message);
            displayNotification("Check you connection and reload the page please.")
        })
  }, [])

  return (
    <div className={classes.root}>
        <>
            <DisplayNotification display = {notification.open} type = {notification.type}  message={notification.message} setDisplay={resetNotification} />
            <TeamToUpdateProvider>
                <Header history={props.history} isLoading={isLoading} setCurrentBoard={setCurrentBoard} />
                <div
                    className={classnames(classes.content)}
                >
                    <Switch>
                        <Route path="/app/dashboard"  render={() => <Dashboard isLoading={isLoading} currentBoard={currentBoard} />} />
                    </Switch>
                </div>
                <div>
                    <AddBoardModal  open={ modalState.addBoard } />
                    <AddTeamModal  open={ modalState.addTeam } />
                    <UpdateTeamModal open={ modalState.updateTeam } />
                </div>
            </TeamToUpdateProvider>
        </>
    </div>
  );

  function getResizeBackgroundImage(link)
  {
      if (link !== null)
      {
          let image = link.image  + "&w=" + viewportSize().width + "&h=" + viewportSize().height +"&fm=jpg&fit=crop"
          return `url(${image})`
      }
      let image = "https://source.unsplash.com/" + viewportSize().width + "x" + viewportSize().height + "/?africa,evening,smile,joy,world"
      return  `url(${image})`
  }
}

export default withRouter(Layout);
