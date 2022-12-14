import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate, Link, useLocation} from "react-router-dom";
import * as service from "../../services/auth-service";
import {createTuit} from "../../services/tuits-service";
import {deleteUser} from "../../services/users-service";
import MyTuits from "./my-tuits";
import MyLikes from "./my-likes";
import MyDislikes from "./my-dislikes";
import EditProfile from "./edit-profile";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState({});
  const [tuit, setTuit] = useState('');

  useEffect(() => {
      const fetchProfile = async () => {
          try {
              const user = await service.profile();
              setProfile(user);
          } catch (e) {
              navigate('/login');
          }
      }
    fetchProfile();
  }, []);

  const logout = () => {
    service.logout(profile).then(() => navigate('/login'));
  }

  const handleDeleteProfile = async () => {
    const { deletedCount } = await deleteUser(profile._id);
    if (deletedCount > 0) {
      logout();
    }
  }

  return (
    <div className="ttr-profile">
    <div className="border border-bottom-0">
      <h4 className="p-2 mb-0 pb-0 fw-bolder">
        {profile.username}
        <i className="fa fa-badge-check text-primary"/>
      </h4>
      <span className="ps-2">67.6K Tuits</span>
      <div className="mb-5 position-relative">
        <img className="w-100" src="../images/nasa-profile-header.jpg"/>
        <div className="bottom-0 left-0 position-absolute">
          <div className="position-relative">
            <img className="position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px"
                 src="../images/nasa-3.png"/>
          </div>
        </div>
        <Link to="/profile/edit"
              className="mt-2 me-2 btn btn-large btn-primary border border-secondary fw-bolder rounded-pill fa-pull-right">
          Edit profile
        </Link>
        <button
            className="btn btn-danger rounded-pill fa-pull-right fw-bolder mt-2 mb-2"
            onClick={async e => {
              const msg = "Are you sure you want permanently delete your profile? This action cannot be undone."
              const deleteProfile = window.confirm(msg);
              if (deleteProfile) {
                await handleDeleteProfile();
              }
            }}
        >
          Delete profile
        </button>
        <button onClick={logout} className="mt-2 float-end btn btn-warning rounded-pill fw-bolder">
          Logout
        </button>
      </div>

      <div className="p-2">
        <h4 className="fw-bolder pb-0 mb-0">
          {profile.username}<i className="fa fa-badge-check text-primary"/>
        </h4>
        <h6 className="pt-0">@{profile.username}</h6>
        <p className="pt-2">
          Welcome to my page. {profile.biography}
        </p>
        <p>
          <i className="far fa-location-dot me-2"/>
          Pale Blue Dot
          <i className="far fa-link ms-3 me-2"/>
          <a href="nasa.gov" className="text-decoration-none">nasa.gov</a>
          <i className="far fa-balloon ms-3 me-2"/>
          Born October 1, 1958
          <br/>
          <i className="far fa-calendar me-2"/>
          {profile.joined?.substring(0, 10) ?? ''}
        </p>
        <b>178</b> Following
        <b className="ms-4">51.1M</b> Followers
        {
          profile.admin &&
          <a href="/#/admin/users"
             className="mt-3 btn btn-lg btn-warning rounded-pill w-100 fw-bold text-white">
            Admin Page</a>
        }
        <div className="pt-3">
          <textarea
              value={tuit}
              onChange={(e) =>
                  setTuit(e.target.value)}
              placeholder="What do you want to say?"
              className="w-75 border-1"
              resize="none"
          >
          </textarea>
          <button
              className={'btn btn-success rounded-pill right-button'}
              onClick={() => {
                createTuit(profile._id, tuit);
                setTuit('');
              }}
              disabled={!tuit || !profile}
          >
            Post Tuit
          </button>
        </div>
        <ul className="mt-4 nav nav-pills nav-fill">
          <li className="nav-item">
            <Link to="/profile/mytuits"
                  className={`nav-link ${location.pathname.indexOf('mytuits') >= 0 ? 'active':''}`}>
              Tuits</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile/tuits-and-replies"
                  className={`nav-link ${location.pathname.indexOf('tuits-and-replies') >= 0 ? 'active':''}`}>
              Tuits & replies</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile/media"
                  className={`nav-link ${location.pathname.indexOf('media') >= 0 ? 'active':''}`}>
              Media</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile/mylikes"
                  className={`nav-link ${location.pathname.indexOf('mylikes') >= 0 ? 'active':''}`}>
              Likes</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile/mydislikes"
                  className={`nav-link ${location.pathname.indexOf('mydislikes') >= 0 ? 'active':''}`}>
              Dislikes
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <Routes>
      <Route path="/mytuits" element={<MyTuits/>}/>
      <Route path="/mylikes" element={<MyLikes/>}/>
      <Route path="/mydislikes" element={<MyDislikes/>}/>
    </Routes>
  </div>
);
};

export default Profile;
