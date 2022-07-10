import React, { useEffect, useState } from 'react';

import { IPlant } from '../../types/Plant.interface';
import { getPlantData } from '../../services/Plant.service';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIdFromLocation } from '../../utilities/StringHelpers';
import { useAuth } from '../../hooks/useAuth';
import DetailsPageHeader from '../../components/detailsPageHeader';
import PlantUpdateForm from '../../components/plantUpdateForm';
import Row from 'react-bootstrap/Row';
import GrowthLogCarousel from '../../components/growthLogCarousel/GrowthLogCarousel';
import CreateGrowthLogForm from '../../components/createGrowthLogForm';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IGrowthLog } from '../../types/IGrowthLog';
import PlantGrowthChart from '../../components/plantGrowthChart';

type Props = {
};

const PlantDetails: React.FC<Props> = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [plantData, setPlantData] = useState<IPlant | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showCreateGrowthLogForm, setShowCreateGrowthLogForm] = useState(false);

  useEffect(() => {
    (async () => {
      if (auth) {
        const [shouldRedirect, redirectRoute] = auth.shouldRedirect();

        if (shouldRedirect && redirectRoute) {
          navigate(redirectRoute);
        };
      };
      const id = getIdFromLocation(location);
      const data = (await getPlantData(id)) as IPlant;
      console.log(data);
      setPlantData(data);
    })();
  }, []);

  const handleUpdatedPlantData = (updatedPlantData: IPlant) => {
    setPlantData(updatedPlantData);
  };

  const handleEditButtonOnClick = (event: React.MouseEvent<HTMLElement>) => {
    let toggle = true;

    if (showUpdateForm) {
      toggle = false;
    }
    console.log('toggle ', toggle);
    setShowUpdateForm(toggle);
  };

  const handleAddGrowthLogButtonOnClick = () => {
    let toggle = true;

    if (showCreateGrowthLogForm) {
      toggle = false;
    }
    console.log('toggle ', toggle);
    setShowCreateGrowthLogForm(toggle);
  };

  const updateGrowthLogs = (updatedGrowthLog: IGrowthLog) => {
    if (plantData) {
      plantData.growthLogs.push(updatedGrowthLog);
    }
    setPlantData(plantData);
  };

  return (
    <>
      {plantData &&
        <Row>
          <DetailsPageHeader
            name={plantData.commonName}
            id={plantData._id}
            dateCreated={plantData.dateCreated}
          />
          {showUpdateForm ?
            <Button
              style={{
                width: '10%',
                textAlign: 'center',
                position: 'absolute',
                top: '9vh',
                right: '10vw',
                zIndex: '99'
              }}
              onClick={handleEditButtonOnClick}
              variant="outline-danger"
            >
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </Button>
          :
            <Button
              style={{
                width: '10%',
                textAlign: 'center',
                position: 'absolute',
                top: '9vh',
                right: '10vw',
                zIndex: '99'
              }}
              onClick={handleEditButtonOnClick}
              variant="outline-warning"
            >
              <FontAwesomeIcon icon={faEdit} size="2x" />
            </Button>
          }
          {showUpdateForm ?
            <PlantUpdateForm
              plantData={plantData}
              updatedPlantDataHandler={handleUpdatedPlantData}
            />
          : null}
          <PlantGrowthChart plantId={plantData._id} />
          <GrowthLogCarousel
            plantData={plantData}
            editButtonHandler={handleAddGrowthLogButtonOnClick}
            showingCreateGrowthLogForm={showCreateGrowthLogForm}
          />
          {showCreateGrowthLogForm &&
            <CreateGrowthLogForm plantData={plantData} updatedGrowthLogHandler={updateGrowthLogs} />
          }
        </Row>
      }
    </>
  );
};

export default PlantDetails;
