/**
 * @file Implements Users Table that displays all users in the table and enables
 * admins to edit each users' profile and delete users' account
 */
import React, {useEffect, useState} from "react";
import * as usersService from "../../../services/users-service";
import UsersTable from "./users-table";
import * as authService from "../../../services/auth-service";

/**
 * Implement Users table that displays all users and enables admins to manage users' accounts.
 * It will fetch all users in the database and utilize the users-table component
 * to displays all given users in the table.
 */
const UsersTableManager = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [newUser, setNewUser] = useState({admin: false});

    useEffect(async () => {
        const profile = await authService.profile().catch(e => alert("Must logged in as an admin user!"));
        let fetchUsers = await usersService.findAllUsers();
        fetchUsers = fetchUsers.filter(u => u._id !== profile._id);
        setAllUsers(fetchUsers);
    }, [])

    const createANewUser = () => {
        if (newUser.username === undefined || newUser.username === ''
            || newUser.password === undefined || newUser.password === ''
            || newUser.email === undefined || newUser.email === '') {
            alert("Username, password and email cannot be empty!")
            return
        }
        try {
            usersService.adminCreateUser(newUser)
                .then((createdUser) => {
                    setAllUsers([...allUsers, createdUser])
                    setNewUser({admin: false})
                    alert("Created User successfully!")
                })
                .catch(e => alert("Please check if username is taken!"))
        } catch (e) {
            alert("Please try again!")
        }
    }

    const deleteUser = (uid) => {
        usersService.adminDeleteUser(uid)
            .then(res => {
                let updatedUsers = allUsers.filter(u => u._id !== uid);
                setAllUsers(updatedUsers);
                alert("Successfully deleted!")
            })
            .catch(e => alert("Try again later!"))
    }

    return (
        <div>
            <div className='row col-10'>
                <input className="col mb-2 form-control"
                       value={newUser.username || ''}
                       onChange={(e) =>
                           setNewUser({...newUser, username: e.target.value})}
                       placeholder="username"/>
                <input className="col ms-4 mb-2 form-control"
                       value={newUser.password || ''}
                       onChange={(e) =>
                           setNewUser({...newUser, password: e.target.value})}
                       placeholder="password" type="password"/>
                <input className="col ms-4 mb-2 form-control"
                       value={newUser.email || ''}
                       onChange={(e) =>
                           setNewUser({...newUser, email: e.target.value})}
                       placeholder="email" type="email"/>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">User role:</label>
                    <div className="col-sm-4 form-check">
                        <input className="form-check-input"
                               name='role'
                               type="radio"
                               checked={newUser.admin === false}
                               onChange={(e) =>
                                   setNewUser({...newUser, role: e.target.value})}/>
                        <label className="form-check-label">
                            GENERAL
                        </label>
                    </div>
                    <div className="col-sm-4 form-check">
                        <input className="form-check-input"
                               name='role'
                               type="radio"
                               checked={newUser.admin === true}
                               onChange={(e) =>
                                   setNewUser({...newUser, role: e.target.value})}/>
                        <label className="form-check-label">
                            ADMIN
                        </label>
                    </div>
                </div>
                <button onClick={createANewUser}
                        className="btn btn-success mb-5">Create a new User
                </button>
            </div>
            <UsersTable
                deleteUser={deleteUser}
                users={allUsers}/>
        </div>
    )
}

export default UsersTableManager