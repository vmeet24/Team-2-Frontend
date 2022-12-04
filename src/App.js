import React from "react";
import './styles.css';
import Tuiter from "./components/tuiter";
import {HashRouter, Route, Routes} from "react-router-dom";
import Admin from "./components/admin";
import AdminEditProfile from "./components/admin/users-manager/admin-edit-profile";
import UsersTuits from "./components/admin/tuits-manager/users-tuits";

function App() {
  return (
    <HashRouter>
        <Routes>
            <Route path='/admin/*' element={<Admin/>}/>
            <Route path='/admin/:currentPage' element={<Admin/>}/>
            <Route path='/admin/profile/:uid' element={<AdminEditProfile/>}/>
            <Route path='/admin/:uid/tuits' element={<UsersTuits/>}/>
            <Route path='/*' element={<Tuiter/>}/>
        </Routes>
    </HashRouter>
);
}

export default App;
