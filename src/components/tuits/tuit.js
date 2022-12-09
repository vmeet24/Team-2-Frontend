import React from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";

const Tuit = ({tuit, deleteTuit, profile, refreshTuits}) => {

  const Tuit = ({tuit, deleteTuit}) => {
    const handleDelete = () => {
        const confirm = window.confirm("Are you sure you want delete this tuit?")
        if (confirm) {
            deleteTuit(tuit._id);
        }
    }
    
  return(
    <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
      <div className="pe-2">
        {
          tuit.postedBy &&
          <img src={`../images/${tuit.postedBy.username}.jpg`}
               className="ttr-tuit-avatar-logo rounded-circle"/>
        }
      </div>
      <div className="w-100">
          {(profile && (profile.admin || tuit?.postedBy?._id === profile?._id)) &&
              <i
                  onClick={async () => {
                      await deleteTuit(tuit._id)
                      await refreshTuits()
                  }}
                  className="fas fa-remove fa-2x fa-pull-right"
              >
              </i>
          }
        <h2
          className="fs-5">
          {tuit.postedBy && tuit.postedBy.username}
          @{tuit.postedBy && tuit.postedBy.username} - {tuit.postedOn.slice(0,10)}</h2>
        {tuit.tuit}
        {
          tuit.youtube &&
            <TuitVideo tuit={tuit}/>
        }
        {
          tuit.image &&
          <TuitImage tuit={tuit}/>
        }
        <TuitStats tuit={tuit}/>
      </div>
    </li>
  );
}
export default Tuit;