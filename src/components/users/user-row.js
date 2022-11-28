import React, {useState} from "react";
import {deleteUser} from "../../services/users-service";

const UserRow = ({user, profile}) => {
    const [deleted, setDeleted] = useState(false);
    
    const handleDelete = async (id) => {
        setDeleted(true);
        const { deletedCount } = await deleteUser(id);
        if (!deletedCount || deletedCount === 0) {
            setDeleted(false);
        }
    }

    return (
        <div className="list-group-item" hidden={deleted}>
            <span key={`username-${user._id}`} className="fs-3">{user.username}</span>
            <button
                disabled={!profile || !profile.admin || deleted}
                hidden={!profile || !profile.admin}
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleDelete(user._id)
                }}
                className="btn btn-danger fa-pull-right">
                <i className="fas fa-remove"></i>
            </button>
        </div>
    )
}

export default UserRow;