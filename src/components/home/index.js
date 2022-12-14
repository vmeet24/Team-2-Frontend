import React, {useCallback} from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {profile} from "../../services/auth-service"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const Home = () => {
  const {uid} = useParams();
  const [tuits, setTuits] = useState([]);
  const [tuit, setTuit] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  const getProfile = () =>
    profile().then(user => setUserProfile(user))

  const findTuits = useCallback(() => {
    if (uid) {
      return service.findTuitByUser(uid)
        .then(tuits => setTuits(tuits))
    } else {
      return service.findAllTuits()
        .then(tuits => setTuits(tuits))
    }
  }, [uid])

  useEffect(() => {
    findTuits()
    getProfile()
  }, [findTuits]);

  const createTuit = () =>
      service.createTuit(userProfile._id, tuit)
          .then(findTuits)

  const deleteTuit = (tid) =>
      service.deleteTuit(tid)
          .then(findTuits)

  return(
    <div className="ttr-home">
      <div className={userProfile ? "border border-bottom-0" : "border"}>
        <h4 className="fw-bold p-2">Home Screen</h4>
        {userProfile &&
          <div className="d-flex">
            <div className="p-2">
              <img alt="" className="ttr-width-50px rounded-circle" src="../images/nasa-logo.jpg"/>
            </div>
            <div className="p-2 w-100">
              <textarea
                  value={tuit}
                  onChange={(e) => setTuit(e.target.value)}
                  placeholder="What's happening?"
                  className="w-100 border-0"
              ></textarea>
              <div className="row">
                <div className="col-10 ttr-font-size-150pc text-primary">
                  <i className="fas fa-portrait me-3"></i>
                  <i className="far fa-gif me-3"></i>
                  <i className="far fa-bar-chart me-3"></i>
                  <i className="far fa-face-smile me-3"></i>
                  <i className="far fa-calendar me-3"></i>
                  <i className="far fa-map-location me-3"></i>
                </div>
                <div className="col-2">
                  <button
                      className={`btn btn-success rounded-pill fa-pull-right fw-bold ps-4 pe-4`}
                      onClick={async () => {
                        await createTuit()
                        setTuit('')
                      }}
                      disabled={!tuit || !userProfile}
                  >
                    Tuit
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      {!userProfile &&
          <h4 className="pt-2 pb-2 text-center"><i>Please login to post your own tuits</i></h4>
      }
      <Tuits
          tuits={tuits}
          profile={userProfile}
          refreshTuits={findTuits}
          deleteTuit={deleteTuit}
      />
    </div>
  );
};
export default Home;