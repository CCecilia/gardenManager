import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import { IPlant } from '../../types/Plant.interface';
import { deletePlantData, getPlantData, updatePlantData } from '../../services/Plant.service';
import { titleCase } from '../../utilities/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIdFromLocation } from '../../utilities/StringHelpers';
import { RoutePaths } from '../../types/RoutePaths.enum';
import { useAuth } from '../../hooks/useAuth';

type Props = {
};

interface GrowthStage {
  cycleNumber: number;
  name: string;
}

interface InputValues {
  commonName?: string;
  id?: string;
  height?: number;
  numberOfLeaves?: number;
  hoursOfLight?: number;
  numberOfLumensExposure?: number;
  genus?: string;
  species?: string;
  harvested?: boolean;
  currentStage?: GrowthStage,
}

const PlantDetails: React.FC<Props> = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [plantData, setPlantData] = useState<IPlant | null>(null);
  const initialValues: InputValues = {
    commonName: plantData?.commonName,
    id: plantData?._id,
    height: plantData?.height,
    numberOfLeaves: plantData?.numberOfLeaves,
    hoursOfLight: plantData?.hoursOfLight,
    numberOfLumensExposure: plantData?.numberOfLumensExposure,
    genus: plantData?.genus,
    species: plantData?.species,
    harvested: plantData?.harvested,
  };

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

  const handleDeleteButtonClick = async (event: React.MouseEvent<HTMLAnchorElement>, plantId: string) => {
    event.preventDefault();

    const results = await deletePlantData(plantId);
    if (results) {
      navigate(RoutePaths.PLANTS_ROUTE);
    }
  };

  return (
    <>
      {plantData &&
        <div className='row'>
          <h3>
            {titleCase(plantData.commonName)}&nbsp;
          </h3>
          <small className="text-muted">ID: {plantData._id}</small>
        </div>
      }
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
          if (plantData?._id) {
            Object.assign(values, { id: plantData._id });
            const updatedData = await updatePlantData(values as Partial<IPlant>);

            setPlantData(updatedData);
          };
        }}
      >
        <Form>
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="commonName">Common Name</label>
              <Field
                id="commonName"
                name="commonName"
                placeholder={
                  plantData ? titleCase(plantData.commonName) : 'Common Name'
                }
                className="form-control"
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="id">ID</label>
              <Field
                id="id"
                name="id"
                placeholder={plantData ? titleCase(plantData._id) : 'ID'}
                className="form-control"
                readOnly={true}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="genus">Genus</label>
              <Field
                id="genus"
                name="genus"
                placeholder={plantData ? titleCase(plantData.genus) : 'Genus'}
                className="form-control"
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="species">Species</label>
              <Field
                id="species"
                name="species"
                placeholder={plantData ? titleCase(plantData.species) : 'Number Of Lumens Exposure'}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="height">Height</label>
              <Field
                id="height"
                name="height"
                placeholder={plantData ? plantData.height.toString() : 'Height'}
                className="form-control"
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="numberOfLeaves">Number Of Leaves</label>
              <Field
                id="numberOfLeaves"
                name="numberOfLeaves"
                placeholder={plantData ? plantData.numberOfLeaves.toString() : 'Number Of Leaves'}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="height">Hours Of Light</label>
              <Field
                id="hoursOfLight"
                name="hoursOfLight"
                placeholder={plantData ? plantData.hoursOfLight.toString() : 'Hours Of Light'}
                className="form-control"
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="numberOfLumensExposure">Number Of Lumens Exposure</label>
              <Field
                id="numberOfLumensExposure"
                name="numberOfLumensExposure"
                placeholder={plantData ? plantData.numberOfLumensExposure.toString() : 'Number Of Lumens Exposure'}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-6">
              <Field type="checkbox" name="harvested" />
              <label className="form-check-label" htmlFor="harvested">
                {plantData?.harvested ? 'Harvested' : 'Not Harvested'}
              </label>
            </div>
            <div className="form-group col-6">
              <Field as="select" name="currentStage" defaultValue={plantData?.currentStage ? JSON.stringify(plantData.currentStage) : ''}>
                {plantData?.stages &&
                  plantData.stages.map((stage: GrowthStage, index: number) => {
                    if (stage.cycleNumber !== plantData.currentStage.cycleNumber) {
                      return (
                        <option key={index} value={JSON.stringify(stage)}>{stage.cycleNumber} {stage.name}</option>
                      );
                    };
                    return null;
                  })
                }
              </Field>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
          &nbsp;
          {plantData?._id &&
            <a className="btn btn-danger active" onClick={(event) => handleDeleteButtonClick(event, plantData._id)}>Delete</a>
          }
        </Form>
      </Formik>
    </>
  );
};

export default PlantDetails;
