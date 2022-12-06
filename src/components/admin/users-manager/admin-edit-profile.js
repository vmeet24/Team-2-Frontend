/**
 * @file Implements edit-profile component that displays user's information, and
 * enable admin to manage user's account.
 * Admin can click update to update their profile information
 * Admin can click delete to delete their account
 * Admin can click go-back to their profile page.
 */
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as authService from "../../../services/auth-service";
import * as usersService from "../../../services/users-service";


/**
 * Implements AdminEditProfile component that will fetch and display user's profile information and
 * enables admin to edit user's profile information and delete user's account
 */
const AdminEditProfile = () => {
    const {uid} = useParams()
    const [adminUser, setAdmin] = useState({});
    const [profile, setProfile] = useState({});
    const [passwordChanged, setPasswordChanged] = useState(false);
    const navigate = useNavigate();
    useEffect(async () => {
        try {
            const logAsAdmin = await authService.profile();
            if (adminUser.admin === false) {
                alert("Must logged in as an admin user.")
                navigate('/login')
            }
            setAdmin(logAsAdmin)
            const findUserProfile = await usersService.findUserById(uid);
            setProfile(findUserProfile);
        } catch (e) {
            alert("Must logged in as an admin user.")
            navigate('/login')
        }
    }, [])

    /**
     * A call back function that helps call user service
     * to update user's profile information when user
     * clicks the "save" button
     */
     const handleUserUpdate = () => {
        if (!passwordChanged) {
            delete profile.password
        }
        let newProfile = profile;
        if (profile.password === '') {
            alert("Password cannot be empty")
        } else {
            usersService.updateUser(newProfile._id, newProfile)
                .then(res => {
                    alert("Successfully Updated!")
                    setProfile(newProfile);
                    setPasswordChanged(false);
                })
                .catch(error => {
                    alert("Failed to update!")
                })
        }
    }


    return (
        <div className="ttr-admin-edit-profile ms-5 me-5">
            <div className="border border-bottom-0">
                <Link to="/admin/user"
                      className="btn btn-light rounded-pill fa-pull-left fw-bolder mt-2 mb-2 ms-2">
                    <i className="fas fa-angle-left"/>
                </Link>
                <span to="/admin/*"
                      onClick={() => handleUserUpdate()}
                      className="save-button-2 btn btn-success rounded-pill fa-pull-right fw-bolder mt-2 mb-2 me-2">
                    Save
                </span>
                {/* <Link
                    className="delete-button btn btn-danger rounded-pill fa-pull-right fw-bolder mt-2 mb-2 me-2"
                    onClick={() => handleDeleteAccount()}
                    to='/'>
                    Delete
                </Link> */}
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
                               setProfile({...profile, username: e.target.value})
                           }}
                           value={profile.username || ''}/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="password">Reset password</label>
                    <input id="password"
                           className="p-0 form-control border-0"
                           type="password"
                           value={profile.password || "*****"}
                           onChange={(e) => {
                               setPasswordChanged(true);
                               setProfile({...profile, password: e.target.value})
                           }}
                    />
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="joined-date">Joined date</label>
                    <input id="joined-date"
                           readOnly
                           className="p-0 form-control border-0"
                           value={profile.joined? profile.joined.split('T')[0] : ""}/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="first-name">First name</label>
                    <input id="first-name"
                           className="p-0 form-control border-0"
                           value={profile.firstName || ''}
                           onChange={(e) => {
                               setProfile({...profile, firstName: e.target.value})
                           }}
                           placeholder="Edit your first name"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="last-name">Last name</label>
                    <input id="last-name"
                           className="p-0 form-control border-0"
                           value={profile.lastName || ''}
                           onChange={(e) => {
                               setProfile({...profile, lastName: e.target.value})
                           }}
                           placeholder="Edit your last name"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        className="p-0 form-control border-0"
                        value={profile.biography || ''}
                        onChange={(e) => {
                            setProfile({...profile, biography: e.target.value})
                        }}
                        id="bio"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="date-of-birth">Date of birth</label>
                    <input id="date-of-birth"
                           className="p-0 form-control border-0"
                           type="date"
                           onChange={(e) => {
                               setProfile({...profile, dateOfBirth: e.target.value})
                           }}
                           value={profile.dateOfBirth? profile.dateOfBirth.split('T')[0] : ""}/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="email">Email</label>
                    <input id="email" placeholder="alan@cam.ac.uk"
                           className="p-0 form-control border-0"
                           onChange={(e) => {
                               setProfile({...profile, email: e.target.value})
                           }}
                           value={profile.email || ''}
                           type="email"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="account">Role</label>
                    <select
                        disabled={true}
                        value={profile.role || ''}
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
                               checked={profile.maritalStatus === "MARRIED"}
                               onChange={(e) => {
                                   setProfile({...profile, maritalStatus: e.target.value})
                               }}
                               value="MARRIED"/>
                        <label htmlFor="married">Married</label>
                    </span>
                        <span className='col'>
                        <input id="single"
                               type="radio"
                               name="marital"
                               checked={profile.maritalStatus === "SINGLE"}
                               onChange={(e) => {
                                   setProfile({...profile, maritalStatus: e.target.value})
                               }}
                               value="SINGLE"/>
                        <label htmlFor="single">Single</label>
                    </span>
                        <span className='col'>
                        <input id="widow"
                               type="radio"
                               name="marital"
                               onChange={(e) => {
                                   setProfile({...profile, maritalStatus: e.target.value})
                               }}
                               checked={profile.maritalStatus === "WIDOW"}
                               value="WIDOW"/>
                        <label htmlFor="widow">Widow</label>
                    </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AdminEditProfile