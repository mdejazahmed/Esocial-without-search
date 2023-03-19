import React, { useContext } from 'react';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { BrowserRouter,Routes , Route } from "react-router-dom";
import { AuthContext } from './context/AuthContext';

function App() {
  const {user}=useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={user?Home:Register} />
        <Route path="/login" Component={user?Home:Login} />
        <Route path="/register" Component={user?Home:Register} />
        <Route path="/profile/:username" Component={Profile} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
