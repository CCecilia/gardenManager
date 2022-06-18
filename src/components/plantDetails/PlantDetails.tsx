import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import { IPlant } from '../../types/Plant.interface';
import { getPlantData } from '../../services/Plant.service';
import { titleCase } from '../../utilities/Typography';
import { useLocation } from 'react-router-dom';

type Props = {};

interface InputValues {
  commonName?: string;
  id?: string;
}

const PlantDetails: React.FC<Props> = () => {
  const location = useLocation();
  const [plantData, setPlantData] = useState<IPlant | null>(null);
  const initialValues: InputValues = {
    commonName: plantData?.commonName,
    id: plantData?._id,
  };

  useEffect(() => {
    (async () => {
      const { pathname } = location;
      // eslint-disable-next-line no-unused-vars
      const [_empty, _base, id] = pathname.split('/');
      const data = (await getPlantData(id)) as IPlant;

      setPlantData(data);
    })();
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          // alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
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
          <div className=""></div>
        </Form>
      </Formik>
    </>
  );
};

export default PlantDetails;
