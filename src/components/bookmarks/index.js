import React, {useCallback, useEffect, useState} from "react";
import Tuits from "../tuits";
import * as tuitService from "../../services/tuits-service";
import * as bookmarkService from "../../services/bookmarks-service.js";
import * as service from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

function Bookmarks () {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [bookmarkedTuits, setBookmarkedTuits] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTuits = async () => {
        try {
            const user = await service.profile();
            setProfile(user);
            findTuitsIBookmark()
        } catch (e) {
            alert("Please login!")
            navigate('/login');
        }
    }

    const callbackTuits = useCallback(getTuits, [navigate])

    const deleteTuit = (tid) =>
        tuitService.deleteTuit(tid)
            .then(getTuits)

    useEffect(() => {
        callbackTuits()
    }, [callbackTuits])

    /**
     * Fetch all tuits that bookmarked by user
     */
    const findTuitsIBookmark = () => {
        bookmarkService.findAllTuitsBookmarkedByUser("me")
            .then(tuits => {
                setBookmarkedTuits(tuits.map(tuit => tuit.bookmarkedTuit));
                setLoading(false);
            });
    }

    return (
        <div>
            <h1>My Bookmarks</h1>
            {(!loading && bookmarkedTuits.length === 0) &&
                <h4><i>You have no bookmarked tuits</i></h4>
            }
            <Tuits
                tuits={bookmarkedTuits}
                refreshTuits={findTuitsIBookmark}
                profile={profile}
                deleteTuit={deleteTuit}
            />
        </div>
    );
}
export default Bookmarks;