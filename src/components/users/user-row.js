import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteUser, updateUser} from "../../services/users-service";
import {logout} from "../../services/auth-service";

const UserRow = ({user, profile, refresh}) => {
    const [deleted, setDeleted] = useState(false);
    const navigate = useNavigate();

    // on success, just hide the user from the list rather than refreshing to save API calls
    const handleDelete = async (id) => {
        setDeleted(true);
        const { deletedCount } = await deleteUser(id);
        if (id === profile._id) { // if we delete ourselves, log out
            logout();
            navigate('/login');
        } else if (!deletedCount || deletedCount === 0) {
            setDeleted(false);
        }
    }

    // refresh here to show that updated status went through
    const toggleAdmin = async () => {
        const { modifiedCount } = await updateUser(user._id, { admin: !user.admin })
        if (modifiedCount && modifiedCount > 0) {
            refresh();
        }
    }

    return (
        <div className="list-group-item" hidden={deleted}>
            <span key={`username-${user._id}`} className="fs-3">{user.username}</span>
            <button
                disabled={!profile || !profile.admin || deleted}
                hidden={!profile || !profile.admin}
                onClick={(e) => handleDelete(user._id) }
                className="btn btn-danger fa-pull-right"
            >
                <i className="fas fa-remove"></i>
            </button>
            <button
                disabled={!profile || !profile.admin}
                hidden={!profile || !profile.admin || profile._id === user._id}
                onClick={toggleAdmin}
                className="btn btn-warning fa-pull-right"
            >
                {user.admin ? 'Revoke Admin' : 'Make Admin'}
            </button>
        </div>
    )
}

export default UserRow;