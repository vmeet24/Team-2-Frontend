import UserRow from "../components/users/user-row";
import {screen, render, act} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllUsers} from "../services/users-service";

// list of static mocked users for testing
const MOCKED_USERS = [
    {username: "charlie", password: 'charlie321', email: 'charlie@charlie.com', _id: '555'},
    {username: "dorothy", password: 'dorothy987', email: 'dorothy@dorothy.com', _id: '123'}
];

// use our static array here
test('Users render mocked', () => {
    for (const user of MOCKED_USERS) {
        render(
            <HashRouter>
                <UserRow user={user}/>
            </HashRouter>
        );
        // make sure each of our mocked users are there
        const username = screen.getByText(user.username);
        expect(username).toBeInTheDocument();
    }
});

// test with data in our remote DB already
test('Users render with API', async () => {
    const users = await findAllUsers();
    for (const user of users) {
        render(
            <HashRouter>
                <UserRow user={user}/>
            </HashRouter>
        );

        // make sure each of our users are there
        const username = screen.getByText(user.username);
        expect(username).toBeInTheDocument();

        // buttons should be hidden as no one logged in
        let buttons = screen.queryAllByRole('button');
        expect(buttons.length).toEqual(0);
        buttons = screen.getAllByRole('button', {hidden: true});
        buttons.forEach(button => expect(button).toBeInTheDocument());
    }
});
