/**
 * @file Implements tuit list component for admins to manage tuits in the system.
 * It utilizes the reusable editable tuits component.
 */
import React, {useEffect, useState} from "react";
import * as tuitsService from "../../../services/tuits-service"
import EditableTuits from "./editable-tuits";
import {useParams} from "react-router-dom";

/**
 * Implements tuit list that displays all tuits and uses editable tuits component
 * that enables admins to manage tuits in the system.
 */
const AllTuits = () => {
    const {currentPage} = useParams();
    const [allTuits, setAllTuits] = useState([]);
    const deleteTuit = (tid) => {
        tuitsService.deleteTuit(tid)
            .then(res => {
                let updatedTuits = allTuits.filter(t => t._id !== tid);
                setAllTuits(updatedTuits);
                alert("Tuti successfully deleted!")
            })
            .catch(e => alert("Try again later!"))
    }

    useEffect(async () => {
        let fetchTuits = await tuitsService.findAllTuits()
        setAllTuits(fetchTuits);
   
    }, [])

    return(
        <div>
            <h2>All Tuits</h2>
            <EditableTuits 
            deleteTuit={deleteTuit}
            allTuits={allTuits}/>
        </div>
    )
}

export default AllTuits