/**
 * @file Implements a reusable users table components that displays all users
 * and enables admins to delete users' account.
 */
import React, {useEffect, useState} from "react";
import * as usersService from "../../../services/users-service";
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../admin.css"

/**
 * Implements the users table component that takes an array of users and displays them.
 * @param users JSON array that contains all users.
 * @param deleteUser callback function to delete a certain user.
 */
const UsersTable = ({users}) => {
    const [allUsers, setAllUsers] = useState(users);

    useEffect(() => {
        setAllUsers(users)
    }, [users])

    const deleteUser = (uid) => {
        usersService.adminDeleteUser(uid)
            .then(res => {
                let updatedUsers = allUsers.filter(u => u._id !== uid);
                setAllUsers(updatedUsers);
                alert("Successfully deleted!")
            })
            .catch(e => alert("Try again later! 1" ))
    }

    return (
        <div>
            <h2>Users</h2>
            <Table className="table">
                <thead>
                </thead>
                <tbody>
                {
                    allUsers.map(user =>
                                     <tr key={user._id}>
                                         <td className='username-field'>
                                             <Link to={`/admin/profile/${user._id}`}>
                                                 <h5>{user.username}</h5>
                                             </Link>
                                         </td>
                                         <td>
                                             <Link to={`/admin/${user._id}/tuits`}>
                                                 <h5>Tuits</h5>
                                             </Link>
                                         </td>
                                         <td>
                                             <i onClick={()=> deleteUser(user._id)}
                                                 className='fa fa-times fa-2x admin-delete-button'/>
                                         </td>
                                     </tr>
                    )
                }
                </tbody>
            </Table>
        </div>
    )
}

export default UsersTable