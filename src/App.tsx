import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { Route, Routes } from 'react-router-dom';

import Dashboard from './components/dashboard';
import Home from './components/home';
import Login from './components/login';
import NavBar from './components/navbar';
import React from 'react';
import Register from './components/register';

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <NavBar></NavBar>
      </div>
      <div className="container mt-3">
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path="/login" element={<Login history={['']} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
