/**
 * @file Implements search users component that enables admins to search users by their username
 * and displays search results. Admins can further manage each users' accounts.
 */
import React, {useEffect, useState} from "react";
import UsersTable from "./users-table";
import * as usersService from "../../../services/users-service";
import * as authService from "../../../services/auth-service";

/**
 * Implements search users component that enables admins to search users by their username
 * and displays search results using users table component.
 */
const SearchUsers = () => {
    const [searchName, setSearchName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentAdminId, setCurrentAdminId] = useState("");

    useEffect(async () => {
        const profile = await authService.profile().catch(e => alert("Must logged in as an admin user!"));
        setCurrentAdminId(profile._id);
    }, [])

    const searchUsers = () => {
        if (searchName === '') {
            alert('Please type a name before search!')
            return;
        }
        usersService.searchByUsername(searchName)
            .then((users) => {
                let results = users.filter(u => u._id !== currentAdminId);
                setSearchResults(results);
            })
    }

    return (
        <div>
            <h2>Search users</h2>
            <div className="row">
                <div className="col-9">
                    <input value={searchName}
                           onChange={(event) => {
                               setSearchName(event.target.value)
                           }}
                           className="form-control"
                           placeholder="Please search User's username"/>
                </div>
                <div className="col-3">
                    <button
                        onClick={searchUsers}
                        className="btn btn-primary btn-block">
                        Search
                    </button>
                </div>
            </div>
            <br/>
            {
                !searchResults.length
                &&
                <h2>No Results</h2>
            }
            {
                searchResults.length > 0
                &&
                <UsersTable users={searchResults}/>
            }
        </div>
    )
}

export default SearchUsers