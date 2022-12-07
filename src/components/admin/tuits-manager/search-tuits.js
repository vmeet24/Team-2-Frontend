/**
 * @file Implements search tuits component that enables admins to search tuits by their contents,
 * and displays search results. Admins can further edit/delete the tuits.
 */
import React, {useState} from "react";
import EditableTuits from "./editable-tuits";
import {searchByTuit} from "../../../services/tuits-service";

/**
 * Implements search tuits component that enables admins to search tuits by their contents
 * and displays search results using editable tuits list.
 */
const SearchTuits = () => {
    const [searchTuit, setSearchTuit] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const searchTuits = () => {
        if (searchTuit === '') {
            alert('Please type a tuit before search!')
            return;
        }
        searchByTuit(searchTuit)
            .then((tuits) => {
                setSearchResults(tuits);
            })
    }

    return (
        <div>
            <h2>Search Tuits</h2>
            <div className="row">
                <div className="col-9">
                    <input value={searchTuit}
                           onChange={(event) => {
                               setSearchTuit(event.target.value)
                           }}
                           className="form-control"
                           placeholder="Please search Tuit contents"/>
                </div>
                <div className="col-3">
                    <button
                        data-testid='search-button'
                        onClick={searchTuits}
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
                <EditableTuits allTuits={searchResults}/>
            }
        </div>
    )
}

export default SearchTuits