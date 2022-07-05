import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { Route, Routes } from 'react-router-dom';

import CreatePlant from './components/createPlant';
import Dashboard from './components/dashBoard';
import Header from './components/header';
import Home from './components/home';
import PlantDetails from './components/plantDetails';
import Plants from './components/plants';
import { ProvideAuth } from './hooks/useAuth';
import React from 'react';
import SideBar from './components/sideBar';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Crops from './components/crops';
import CreateCrop from './components/createCrop';
import { RoutePaths } from './types/RoutePaths.enum';
import CropDetails from './components/cropDetails';

const App: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <ProvideAuth>
          <Header></Header>
          <SideBar></SideBar>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route path={RoutePaths.EMPTY_ROUTE} element={<Home />} />
              <Route path={RoutePaths.SIGNIN_ROUTE} element={<SignIn />} />
              <Route path={RoutePaths.SIGNUP_ROUTE} element={<SignUp />} />
              <Route path={RoutePaths.DASHBOARD_ROUTE} element={<Dashboard />} />
              <Route path={RoutePaths.HOME_ROUTE} element={<Home />} />
              <Route path={RoutePaths.CREATE_PLANT_ROUTE} element={<CreatePlant />} />
              <Route path={RoutePaths.PLANTS_ROUTE} element={<Plants />} />
              <Route path={RoutePaths.PLANT_DETAILS_ROUTE} element={<PlantDetails />} />
              <Route path={RoutePaths.CROPS_ROUTE} element={<Crops />} />
              <Route path={RoutePaths.CREATE_CROP_ROUTE} element={<CreateCrop />} />
              <Route path={RoutePaths.CROP_DETAILS_ROUTE} element={<CropDetails />} />
            </Routes>
          </main>
        </ProvideAuth>
      </div>
    </div>
  );
};

export default App;
