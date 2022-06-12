import "bootstrap/dist/css/bootstrap.min.css";

import * as AuthService from "./services/Auth.service";

import { Link, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
import { IUser } from './types/User.type';
import Login from "./components/login/Login";
import React from 'react';
import Register from "./components/register/Register";
import { Routes } from "react-router-dom";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    // EventBus.on("logout", logOut);
    // return () => {
    //   EventBus.remove("logout", logOut);
    // };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                {currentUser.email}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path={"/"} element={<Home/>} />
          <Route path="/login" element={<Login history={[""]}/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
