import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createGrowthLog } from '../../services/Plant.service';
import { IPlant } from '../../types/Plant.interface';

type Props = {
  plantData: IPlant
};

const CreateGrowthLogForm: React.FC<Props> = ({plantData}) => {
  const [plantImgInput, setPlantImgInput] = useState<string | null>(null);
  const [numberOfLeavesInput, setNumberOfLeaves] = useState<number | null>(null);
  const [heightInput, setHeightInput] = useState<number | null>(null);

  const handleCreateFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (plantData && numberOfLeavesInput && heightInput && plantImgInput) {
      console.log(plantImgInput, numberOfLeavesInput, heightInput, plantData?._id);
      await createGrowthLog(plantData._id, numberOfLeavesInput, heightInput, plantImgInput);
    }
  };

  const handleUpdateFormInputOnChange = (event: React.FormEvent<HTMLInputElement>, setStateAction: (data: any) => void) => {
    const { value } = event.currentTarget;
    setStateAction(value);
  };

  const handleCreateGrowthLogImgInputOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (files && files.length) {
      const [fileToEncode] = files;
      const fileReader = new FileReader();
      fileReader.onload = (fileLoadedEvent) => {
        if (fileLoadedEvent.target) {
          const srcData = fileLoadedEvent.target.result;
          if (typeof srcData === 'string') {
            setPlantImgInput(srcData);
          };
        };
      };
      fileReader.readAsDataURL(fileToEncode);
    };
  };


  return <Row>
    <Row style={{marginTop: '1vh'}}>
      <h3>Add Growth Log</h3>
    </Row>
    <Row>
    <Form onSubmit={handleCreateFormSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Plant Image</Form.Label>
        <Form.Control
          id="plantPhoto"
          name="plantPhoto"
          onChange={(e: any) => handleCreateGrowthLogImgInputOnChange(e)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Numbers Of Leaves</Form.Label>
        <Form.Control
          id="numbersOfLeaves"
          name="numbersOfLeaves"
          type="number"
          value={numberOfLeavesInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setNumberOfLeaves)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Height Inches</Form.Label>
        <Form.Control
          id="heightInches"
          name="heightInches"
          type="number"
          value={heightInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setHeightInput)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
    </Row>
  </Row>;
};
export default CreateGrowthLogForm;