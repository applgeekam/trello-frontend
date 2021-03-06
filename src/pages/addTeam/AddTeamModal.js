import React, {useEffect} from "react";
import Modal from "../../components/Modal";
import {Button, CircularProgress, Fade, Typography} from "@material-ui/core";

import DialogActions from "@material-ui/core/DialogActions";
import { useModalDispatch} from "../../context/ModalContext";
import useStyles from "../addTeam/styles";
import AddTeam from "../../components/SmallComponent/AddTeam";
import DialogContent from "@material-ui/core/DialogContent";
import {useAxiosState} from "../../context/AxiosContext";
import {useDashboardDispatch} from "../../context/DashboardContext";
import {sendTeam, URLS} from "../../Module/http";
import {MenuToolBar} from "../../components/TiniComponents/MenuToolBar";
import {useNotificationDispatch} from "../../context/NotificationContext";



// Todo : Very the responsively of this component

function AddTeamModal(props) {
    let classes = useStyles();

    let modalDispatch = useModalDispatch()
    let setDatas = useDashboardDispatch()
    const http = useAxiosState()

    const [isLoading, setLoading] = React.useState(false)
    const [members, setMember] = React.useState([])
    const [name, setName] = React.useState("")
    const [error, setError] = React.useState({})
    const [category, setCategory] = React.useState("")
    const [email, setEmail] = React.useState("")
    const displayNotification = useNotificationDispatch()


    const cancel = () => {
        setEmail("")
        setName("")
        setMember([])
        setLoading(false)
        modalDispatch("ADD_TEAM", false)
    }

    const save = () => {
        setLoading(true)
        sendTeam(URLS.saveTeam, http, {
            name,
            secteur : category,
            members,
        }, next, displayNotification, setLoading, setError)
    }

    const next = (response) => {
        setDatas(response)
        cancel()
    }

    return (
        <div>
            <Modal {...props}>
                <div>
                    <MenuToolBar title="Add a Team" onClose={() => cancel()} />
                   <DialogContent>
                    <AddTeam
                        classes={classes}
                        members={members} setMember={setMember}
                        name={name} setName={setName}
                        error={error} setError={setError}
                        category={category} setCategory={setCategory}
                        email={email} setEmail={setEmail}
                        displayNotification={displayNotification}
                    />
                   </DialogContent>
                   <DialogActions className={classes.buttonModal}>
                       <Button autoFocus onClick={() => cancel()} color="primary" >
                           Cancel
                       </Button>
                       <div className={classes.saveButtonContainer}>
                           {isLoading ? (
                                   <Fade in={isLoading}>
                                       <CircularProgress size={26} color="secondary"/>
                                   </Fade>
                               ) :
                               <Fade in={!isLoading}>
                                   <Button onClick={() => save()}  color="primary" autoFocus variant="contained">
                                       Save
                                   </Button>
                               </Fade>
                           }
                       </div>
                   </DialogActions>
               </div>
            </Modal>
        </div>
    )

}

export default  AddTeamModal;


