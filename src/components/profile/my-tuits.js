import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import {profile} from "../../services/auth-service";
import Tuits from "../tuits";

const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const [userProfile, setProfile] = useState({});

    const findMyTuits = () =>
        service.findTuitByUser("me")
            .then(tuits => setTuits(tuits));

    const getProfile = () =>
        profile().then(user => setProfile(user))

    useEffect(() => {
        findMyTuits();
        getProfile();
    }, []);

    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(findMyTuits);

    return(
        <>
            <i onClick={findMyTuits} className={"fa-solid fa-arrows-rotate"}></i>
            <Tuits
                tuits={tuits}
                deleteTuit={deleteTuit}
                refreshTuits={findMyTuits}
                profile={userProfile}
            />
        </>
    );
};

export default MyTuits;