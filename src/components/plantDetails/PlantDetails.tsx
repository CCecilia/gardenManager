import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import { IPlant } from '../../types/Plant.interface';
import { getPlantData } from '../../services/Plant.service';
import { titleCase } from '../../utilities/Typography';
import { useLocation } from 'react-router-dom';

type Props = {
};

interface InputValues {
  commonName?: string;
}

const PlantDetails: React.FC<Props> = () => {
  const location = useLocation();
  const [plantData, setPlantData] = useState<IPlant | null>(null);
  const initialValues: InputValues = {
    commonName: plantData?.commonName
  };

  useEffect(() => {
    (async () => {
      const { pathname } = location;
      // eslint-disable-next-line no-unused-vars
      const [_empty, _base, id] = pathname.split('/');
      const data = await getPlantData(id) as IPlant;

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
          <div className="row">
            <div className="col">
              <Field id="commonName" name="commonName" placeholder={plantData ? titleCase(plantData.commonName) : 'Common Name'} className="form-control" />
              <ErrorMessage
                name="commonName"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className='col'>
              <h3>Id: {plantData ? plantData._id : ''}</h3>
            </div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default PlantDetails;

