import React, {useState} from "react";
import * as service from "../../services/bookmarks-service"

const TuitStats = ({tuit, user, refreshTuits}) => {
    const [isBookmarked, setBookmarked] = useState(false);

    const bookmarkTuit = () => {
        service.userTogglesTuitBookmarks(user._id, tuit._id)
            .then(result => {
                setBookmarked(true);
                refreshTuits();
            })
    }

    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"></i>
                {tuit.stats && tuit.stats.replies}
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"></i>
                {tuit.stats && tuit.stats.retuits}
            </div>
            <div className="col">
                <i className="far fa-heart me-1"></i>
                {tuit.stats && tuit.stats.likes}
            </div>
            <div className="col">
                <i className="far fa-inbox-out"></i>
            </div>
            <div className="col">
                <span onClick={bookmarkTuit}>
                    {isBookmarked &&
                        <i className="fa-solid fa-bookmark"></i>
                    }
                    {!isBookmarked &&
                        <i className="fa-regular fa-bookmark"></i>
                    }
                </span>
            </div>
        </div>
    );
}

export default TuitStats;