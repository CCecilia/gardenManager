import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { Route, Routes } from 'react-router-dom';

import Dashboard from './components/dashboard';
import Home from './components/home';
import NavBar from './components/navbar';
import { ProvideAuth } from './hooks/useAuth';
import React from 'react';
import SideBar from './components/sidebar';
import SignIn from './components/signIn';
import SignUp from './components/signUp';

const App: React.FC = () => {
  return (
    <div className="container remove-all-margin">
      <div className="row">
        <ProvideAuth>
          <div className='col-12'>
            <NavBar></NavBar>
          </div>
          <div className='col-1'>
            <SideBar></SideBar>
          </div>
          <div className="col-11">
            <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path="/login" element={<SignIn history={['']} />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </ProvideAuth>
      </div>
    </div>
  );
};

export default App;
