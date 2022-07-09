import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { updateNutrientBatchData } from '../../services/NutrientBatch.service';
import { INutrientBatch } from '../../types/INutrientBatch';

type Props = {
  nutrientBatchData: INutrientBatch,
  updatedPlantDataHandler: (data: INutrientBatch) => void;
};

const NutrientBatchUpdateForm: React.FC<Props> = ({nutrientBatchData, updatedPlantDataHandler}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalWaterGallonsInput, setTotalWaterGallonsInput] = useState<number | null>(null);
  const [totalFloraMicroMlsInput, setTotalFloraMicroMlsInput] = useState<number | null>(null);
  const [totalFloraBloomMlsInput, setTotalFloraBloomMlsInput] = useState<number | null>(null);
  const [totalFloraGroMlsInput, setTotalFloraGroMlsInput] = useState<number | null>(null);
  const [phUpMlsInput, setPhUpMlsInput] = useState<number | null>(null);
  const [phDownMlsInput, setPhDownMlsInput] = useState<number | null>(null);
  const [startingPhInput, setStartingPhInput] = useState<number | null>(null);
  const [endingPhInput, setEndingPhInput] = useState<number | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);

    if (nutrientBatchData) {
      if (totalWaterGallonsInput) {
        nutrientBatchData.totalWaterGallons = totalWaterGallonsInput;
      };
      if (totalFloraMicroMlsInput) {
        nutrientBatchData.totalFloraMicroMls = totalFloraMicroMlsInput;
      };
    };

    await updateNutrientBatchData(nutrientBatchData).catch((err) => {
      console.error(err);
    });

    setLoading(false);
  };

  const handleUpdateFormInputOnChange = (event: React.FormEvent<HTMLInputElement>, setStateAction: (data: any) => void) => {
    const { value } = event.currentTarget;
    setStateAction(value);
  };

  return <Row>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Total Water Gallons</Form.Label>
        <Form.Control
          id="totalWaterGallons"
          name="totalWaterGallons"
          className="form-control"
          value={totalWaterGallonsInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setTotalWaterGallonsInput)}
          type="number"
        />
        <Form.Text className="text-muted">
          current: {nutrientBatchData.totalWaterGallons.toString()}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Total Flora Micro Mls</Form.Label>
        <Form.Control
          id="totalFloraMicroMls"
          name="totalFloraMicroMls"
          className="form-control"
          value={totalFloraMicroMlsInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setTotalFloraMicroMlsInput)}
          type="number"
        />
        <Form.Text className="text-muted">
          current: {nutrientBatchData.totalFloraMicroMls.toString()}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Total Flora Bloom Mls</Form.Label>
        <Form.Control
          id="totalFloraBloomMicroMls"
          name="totalFloraBloomMicroMls"
          className="form-control"
          value={totalFloraBloomMlsInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setTotalFloraBloomMlsInput)}
          type="number"
        />
        <Form.Text className="text-muted">
          current: {nutrientBatchData.totalFloraMicroMls.toString()}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Total Flora Gro Mls</Form.Label>
        <Form.Control
          id="totalFloraGroMls"
          name="totalFloraGroMls"
          className="form-control"
          value={totalFloraGroMlsInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setTotalFloraGroMlsInput)}
          type="number"
        />
        <Form.Text className="text-muted">
          current: {nutrientBatchData.totalFloraGroMls.toString()}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>PH Up Mls</Form.Label>
        <Form.Control
          id="phUpMls"
          name="phUpMls"
          className="form-control"
          value={phUpMlsInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setPhUpMlsInput)}
          type="number"
        />
        <Form.Text className="text-muted">
          current: {nutrientBatchData.phUpMls.toString()}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>PH Down Mls</Form.Label>
        <Form.Control
          id="phDownMls"
          name="phDownMls"
          className="form-control"
          value={phDownMlsInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setPhDownMlsInput)}
          type="number"
        />
        <Form.Text className="text-muted">
          current: {nutrientBatchData.phDownMls.toString()}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Starting Ph</Form.Label>
        <Form.Control
          id="startingPh"
          name="startingPh"
          className="form-control"
          value={startingPhInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setStartingPhInput)}
          type="number"
        />
        <Form.Text className="text-muted">
          current: {nutrientBatchData.startingPh.toString()}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ending Ph</Form.Label>
        <Form.Control
          id="endingPh"
          name="endingPh"
          className="form-control"
          value={endingPhInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setEndingPhInput)}
          type="number"
        />
        <Form.Text className="text-muted">
          current: {nutrientBatchData.endingPh.toString()}
        </Form.Text>
      </Form.Group>
    </Form>
  </Row>;
};
export default NutrientBatchUpdateForm;