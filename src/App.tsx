import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { Route, Routes } from 'react-router-dom';
import ThemeProvider from 'react-bootstrap/ThemeProvider';

import CreatePlant from './screens/createPlant';
import Dashboard from './screens/dashBoard';
import Home from './screens/home';
import PlantDetails from './screens/plantDetails';
import Plants from './screens/plants';
import { ProvideAuth } from './hooks/useAuth';
import React from 'react';
import SignIn from './screens/signIn';
import SignUp from './screens/signUp';
import Crops from './screens/crops';
import CreateCrop from './screens/createCrop';
import { RoutePaths } from './types/RoutePaths.enum';
import CropDetails from './screens/cropDetails';
import NutrientBatches from './screens/nutrientBatches';
import NutrientBatchDetails from './screens/nutrientBatchDetails';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import NavBar from './components/navBar';
import CreateNutrientBatch from './screens/createNutrientBatch';

const App: React.FC = () => {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
      <Container fluid>
        <Row>
          <ProvideAuth>
            <NavBar></NavBar>
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
              <Route path={RoutePaths.NUTRIENT_BATCHES_ROUTE} element={<NutrientBatches />} />
              <Route path={RoutePaths.NUTRIENT_BATCH_DETAILS_ROUTE} element={<NutrientBatchDetails />} />
              <Route path={RoutePaths.CREATE_NUTRIENT_BATCH_ROUTE} element={<CreateNutrientBatch />} />
            </Routes>
          </ProvideAuth>
        </Row>
      </Container>
    </ThemeProvider>
  );
};

export default App;
