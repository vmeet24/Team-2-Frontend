import {useEffect, useState} from "react";
import * as service from "../../../services/tuits-service"
import {useParams} from "react-router-dom";
import EditableTuits from "./editable-tuits";

const UsersTuits = () => {
    const {uid} = useParams();
    const [tuits, setTuits] = useState([]);
    
    const findTuitByUser = () =>
        service.findTuitByUser(uid)
                .then(tuits => {
                    setTuits(tuits)
                })
    const deleteTuit = (tid) => {
        service.deleteTuit(tid)
            .then(res => {
                let updatedTuits = tuits.filter(t => t._id !== tid);
                setTuits(updatedTuits);
                alert("Tuti successfully deleted!")
            })
            .catch(e => alert("Try again later!"))
    }
    // useEffect(findTuitById, []);
    useEffect(() => {
        findTuitByUser()
    }, []);


    return(
        <div className="ttr-users-tuits ms-5 me-5">
            <h2>User's Tuits</h2>
            <EditableTuits 
            deleteTuit={deleteTuit}
            allTuits={tuits}/>
        </div>
    );
};
export default UsersTuits;