import React from "react";
import './tuits.css';
import Tuit from "./tuit";

function Tuits({tuits = [], deleteTuit, refreshTuits, profile}) {
    return (
    <div>
      <ul className="ttr-tuits list-group">
        {
          tuits.length > 0 && tuits.map(tuit => {
            return tuit &&
              <Tuit
                  key={tuit._id}
                  deleteTuit={deleteTuit}
                  tuit={tuit}
                  profile={profile}
                  refreshTuits={refreshTuits}
              />
          })
        }
      </ul>
    </div>
  );
}

export default Tuits;