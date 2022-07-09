import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, /* useNavigate */ } from 'react-router-dom';
import { getCropData, getCropNutrientBatchData, getCropPlantData, updateCropData } from '../../services/Crop.service';
import { ICrop } from '../../types/Crop.interface';
import { IPlant } from '../../types/Plant.interface';
import { getIdFromLocation } from '../../utilities/StringHelpers';
import { titleCase } from '../../utilities/Typography';
import PlantsTable from '../../components/plantsTable';
import { useAuth } from '../../hooks/useAuth';
import { INutrientBatch } from '../../types/INutrientBatch';
import NutrientBatchTable from '../../components/nutrientBatchTable';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DetailsPageHeader from '../../components/detailsPageHeader';

type Props = {};

const CropDetails: React.FC<Props> = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cropData, setCropData] = useState<ICrop | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cropName, setCropName] = useState<string>('');
  const [cropPlantData, setCropPlantData] = useState<IPlant[] | null>(null);
  const [cropNutrientBatchData, setCropNutrientBatchData] = useState<INutrientBatch[] | null>(null);

  useEffect(() => {
    (async () => {
      if (auth) {
        const [shouldRedirect, redirectRoute] = auth.shouldRedirect();

        if ( shouldRedirect && redirectRoute ) {
          navigate(redirectRoute);
        };
      };

      const id = getIdFromLocation(location);
      const data: ICrop = await getCropData(id);
      const plantData = await getCropPlantData(data.plants);
      const nutrientBatchData = await getCropNutrientBatchData(data.nutrientBatches);

      setCropData(data);
      setCropPlantData(plantData);
      setCropNutrientBatchData(nutrientBatchData);
    })();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading || !cropData) {
      return;
    }
    setLoading(true);

    cropData.name = cropName;

    await updateCropData(cropData).catch((err) => {
      console.error(err);
    });

    setLoading(false);
  };

  const handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setCropName(event.currentTarget.value);
  };

  return <>
    <Row>
      {cropData &&
        <DetailsPageHeader
          name={cropData.name}
          id={cropData._id}
          dateCreated={cropData.dateCreated}
        />
      }
    </Row>
    <Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="name"
            name="name"
            placeholder={
              cropData ? titleCase(cropData.name) : 'Name'
            }
            className="form-control"
            value={cropName}
            onChange={(e: any) => handleNameChange(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Row>
    <Row>
      <Col xs={12} style={{textAlign: 'center'}}>
        <h2 className="heading">Plants</h2>
      </Col>
      <Col xs={12}>
        {cropPlantData &&
          <PlantsTable plants={cropPlantData}/>
        }
      </Col>
    </Row>
    <Row>
      <Col xs={12} style={{textAlign: 'center'}}>
        <h2 className="heading">Nutrient Batches</h2>
      </Col>
      <Col xs={12}>
        {cropNutrientBatchData &&
          <NutrientBatchTable nutrientBatches={cropNutrientBatchData}/>
        }
      </Col>
    </Row>
  </>;
};

export default CropDetails;