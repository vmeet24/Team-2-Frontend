/**
 * @file Implements edit-profile component that displays user's information, and
 * enable them to manage their account.
 * Users can click update to update their profile information
 * Users can click delete to delete their account
 * Users can click go-back to their profile page.
 */
 import React, {useEffect, useState} from "react";
 import {Link, useNavigate} from "react-router-dom";
 import * as authService from "../../services/auth-service";
 import * as userService from "../../services/users-service";
 
 /**
  * Implements EditProfile component that will fetch and display user's profile information and
  * enables users to edit their profile information and delete their account
  */
const EditProfile = () => {
  const navigate = useNavigate();
    const [profileInfo, setProfileInfo] = useState({});
    const [passwordChanged, setPasswordChanged] = useState(false);

    useEffect(() => {
        authService.profile()
            .then(profile => {
                console.log(profile)
                setProfileInfo(profile);
            })
    }, [])

    /**
     * A call back function that helps call user service
     * to update user's profile information when user
     * clicks the "save" button
     */
    const handleUserUpdate = () => {
        if (!passwordChanged) {
            delete profileInfo.password
        }
        let newProfile = profileInfo;
        if (profileInfo.password === '') {
            alert("Password cannot be empty")
        } else {
            userService.updateUser(newProfile._id, newProfile)
                .then(res => {
                    alert("Successfully Updated!")
                    // console.log(profileInfo)
                    setProfileInfo(newProfile);
                    setPasswordChanged(false);
                })
                .catch(error => {
                    alert("Failed to update!")
                })
        }
    }

    /**
     * A call back function that helps call user service
     * to delete current user account when user
     * clicks "delete" button
     */
    const handleDeleteAccount = () => {
        authService.deleteUser()
            .then(()=> {
                alert("Successfully delete your account!")
                navigate("/")
            })
            .catch((e) => {
                alert("Failed to delete your account. Try again later!")
            })
    }
    return(
      <div className="ttr-edit-profile">
            <div className="border border-bottom-0">
                <Link to="/profile"
                      className="btn btn-light rounded-pill fa-pull-left fw-bolder mt-2 mb-2 ms-2">
                    <i className="fas fa-angle-left"/>
                </Link>
                <span to="/profile"
                      onClick={() => handleUserUpdate()}
                      className="save-button-2 btn btn-success rounded-pill fa-pull-right fw-bolder mt-2 mb-2 me-2">
                    Save
                </span>
                <Link
                    className="delete-button btn btn-danger rounded-pill fa-pull-right fw-bolder mt-2 mb-2 me-2"
                    onClick={() => handleDeleteAccount()}
                    to='/'>
                    Delete
                </Link>
                <h4 className="p-2 mb-0 pb-0 fw-bolder">Edit profile</h4>
                <div className="mb-5 position-relative">
                    <img className="w-100" src="../images/nasa-profile-header.jpg"/>
                    <div className="bottom-0 left-0 position-absolute">
                        <div className="position-relative">
                            <img
                                className="position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px"
                                src="../images/nasa-3.png"/>
                        </div>
                    </div>
                </div>
            </div>
            <form action="profile.html">
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="username">Username</label>
                    <input id="username" title="Username"
                           className="p-0 form-control border-0"
                           placeholder="alan"
                           onChange={(e) => {
                               setProfileInfo({...profileInfo, username: e.target.value})
                           }}
                           value={profileInfo.username || ''}/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="password">Reset password</label>
                    <input id="password"
                           className="p-0 form-control border-0"
                           type="password"
                           value={profileInfo.password || "*****"}
                           onChange={(e) => {
                               setPasswordChanged(true);
                               setProfileInfo({...profileInfo, password: e.target.value})
                           }}
                    />
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="joined-date">Joined date</label>
                    <input id="joined-date"
                           readOnly
                           className="p-0 form-control border-0"
                           value={profileInfo.joined? profileInfo.joined.split('T')[0] : ""}/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="first-name">First name</label>
                    <input id="first-name"
                           className="p-0 form-control border-0"
                           value={profileInfo.firstName || ''}
                           onChange={(e) => {
                               setProfileInfo({...profileInfo, firstName: e.target.value})
                           }}
                           placeholder="Edit your first name"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="last-name">Last name</label>
                    <input id="last-name"
                           className="p-0 form-control border-0"
                           value={profileInfo.lastName || ''}
                           onChange={(e) => {
                               setProfileInfo({...profileInfo, lastName: e.target.value})
                           }}
                           placeholder="Edit your last name"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        className="p-0 form-control border-0"
                        value={profileInfo.biography || ''}
                        onChange={(e) => {
                            setProfileInfo({...profileInfo, biography: e.target.value})
                        }}
                        id="bio"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="date-of-birth">Date of birth</label>
                    <input id="date-of-birth"
                           className="p-0 form-control border-0"
                           type="date"
                           onChange={(e) => {
                               setProfileInfo({...profileInfo, dateOfBirth: e.target.value})
                           }}
                           value={profileInfo.dateOfBirth? profileInfo.dateOfBirth.split('T')[0] : ""}/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="email">Email</label>
                    <input id="email" placeholder="alan@cam.ac.uk"
                           className="p-0 form-control border-0"
                           onChange={(e) => {
                               setProfileInfo({...profileInfo, email: e.target.value})
                           }}
                           value={profileInfo.email || ''}
                           type="email"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="account">Role</label>
                    <select
                        disabled={true}
                        value={profileInfo.role || ''}
                        className="p-0 form-control border-0"
                        id="account">
                        <option value="GENERAL">General User</option>
                        <option value="ADMIN">Admin User</option>
                    </select>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    Marital status
                    <br/>
                    <div className='row'>
                    <span className='col'>
                        <input id="married"
                               type="radio"
                               name="marital"
                               checked={profileInfo.maritalStatus === "MARRIED"}
                               onChange={(e) => {
                                   setProfileInfo({...profileInfo, maritalStatus: e.target.value})
                               }}
                               value="MARRIED"/>
                        <label htmlFor="married">Married</label>
                    </span>
                        <span className='col'>
                        <input id="single"
                               type="radio"
                               name="marital"
                               checked={profileInfo.maritalStatus === "SINGLE"}
                               onChange={(e) => {
                                   setProfileInfo({...profileInfo, maritalStatus: e.target.value})
                               }}
                               value="SINGLE"/>
                        <label htmlFor="single">Single</label>
                    </span>
                        <span className='col'>
                        <input id="widow"
                               type="radio"
                               name="marital"
                               onChange={(e) => {
                                   setProfileInfo({...profileInfo, maritalStatus: e.target.value})
                               }}
                               checked={profileInfo.maritalStatus === "WIDOW"}
                               value="WIDOW"/>
                        <label htmlFor="widow">Widow</label>
                    </span>
                    </div>
                </div>
            </form>
        </div>);
};
export default EditProfile;