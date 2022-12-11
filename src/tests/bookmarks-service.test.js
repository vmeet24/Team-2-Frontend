import { signup } from "../services/auth-service";
import { findAllTuitsBookmarkedByUser, userTogglesTuitBookmarks } from "../services/bookmarks-service";
import { createTuit, findAllTuits, deleteTuit, findTuitById } from "../services/tuits-service";
import { createUser, deleteUsersByUsername, deleteUser } from "../services/users-service"

//jest.mock("axios");

describe('can create, toggle, and view bookmarks', () => {
    const tuit = {
        tuit: "Alice's tuit"
    }



    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        const user = await createUser(ripley);
        ripley["id"] = user._id;
        const data = await createTuit(ripley["id"], tuit.tuit);
        tuit["id"] = data._id;
        console.log("done before all");
    });

    test('can toggle bookmarks', async () => {
        let bookmarks;
        await userTogglesTuitBookmarks(ripley["id"], tuit["id"]);
        bookmarks = await findAllTuitsBookmarkedByUser(ripley["id"]);
        expect(bookmarks.length).toEqual(1);
        await userTogglesTuitBookmarks(ripley["id"], tuit["id"]);
        bookmarks = await findAllTuitsBookmarkedByUser(ripley["id"]);
        expect(bookmarks.length).toEqual(0);
    });

    test('can bookmark a tuit', async () => {
        let bookmarks;
        const userToggles = await userTogglesTuitBookmarks(ripley["id"], tuit["id"]);
        bookmarks = await findAllTuitsBookmarkedByUser(ripley["id"]);
        expect(bookmarks[0].bookmarkedTuit._id).toEqual(tuit["id"]);
        expect(bookmarks[0].bookmarkedBy).toEqual(ripley["id"]);
    })

    afterAll(async () => {
        const admin = {
            username: 'thommas_sowell_admin',
            password: 'compromise',
            email: 'compromise_admin@solutions.com',
            admin: true
        };

        await signup({ username: admin.username, password: admin.password, admin: admin.admin });

        await deleteTuit(tuit["id"]);
        await deleteUsersByUsername(ripley.username);
        await deleteUsersByUsername(admin.username);
        console.log("done after all");
    })
});