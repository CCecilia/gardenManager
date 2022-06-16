import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { Route, Routes } from 'react-router-dom';

import Dashboard from './components/dashBoard';
import Header from './components/header';
import Home from './components/home';
import { ProvideAuth } from './hooks/useAuth';
import React from 'react';
import SideBar from './components/sideBar';
import SignIn from './components/signIn';
import SignUp from './components/signUp';

const App: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <ProvideAuth>
          <Header></Header>
          <SideBar></SideBar>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </main>
        </ProvideAuth>
      </div>
    </div>
  );
};

export default App;
