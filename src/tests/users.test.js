import Users from "../components/users";
import {screen, render, act, waitFor} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createUser, deleteUser} from "../services/users-service";

// list of static mocked users for testing
/*
const MOCKED_USERS = [
    {username: "alice", password: 'alice123', email: 'alice@alice.com', id: '123'},
    {username: "bob", password: '123bob', email: 'bob@bob.com', id: '987'},
    {username: "charlie", password: 'charlie321', email: 'charlie@charlie.com', id: '555'}
];

 */

// insert a user and make sure they appear in the list
describe('Users show up on users view', () => {
    const user = {
        username: 'charlie',
        password: 'charlie321', 
        email: 'charlie@charlie.com'
    }

    // insert our user
    beforeAll(async () => {
        const newUser = await createUser(user);
        user._id = newUser._id;
    });

    // delete our user
    afterAll(async () => {
        await deleteUser(user._id);
    });
    
    test('users render via axios call', async () => {
        act(() => {
            render(
                <HashRouter>
                    <Users/>
                </HashRouter>
            );
        });

        // findByText waits for the state change before checking
        const username = await screen.findByText(user.username);
        expect(username).toBeInTheDocument();
    })
});