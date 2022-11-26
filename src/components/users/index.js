import React, {useEffect, useState} from "react";
import {findAllUsers} from "../../services/users-service";
import * as service from "../../services/auth-service";
import UserRow from './user-row'

const Users = () => {
    const [profile, setProfile] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await service.profile();
                setProfile(user);
                console.log(profile)
            } catch (e) {
                console.log('No user logged in')
            }
        }

        const fetchUsers = async () => {
            try {
                const usersList = await findAllUsers();
                setUsers(usersList);
            } catch (e) {
                alert('Error fetching user info');
            }
        }
        fetchProfile();
        fetchUsers();
    }, []);

    return (
        <>
            <h1>Tuiter Users</h1>
            <h3>Administrators:</h3>
            <div className="list-group mb-3">
                {users.filter(user => user.admin).map(user => 
                    <UserRow key={user._id} user={user} profile={profile} />
                )}
            </div>
            <h3>Users:</h3>
            <div className="list-group">
                {users.filter(user => !user.admin).map(user =>
                    <UserRow key={user._id} user={user} profile={profile} />
                )}
            </div>
        </>
    )
}

export default Users