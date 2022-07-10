import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createGrowthLog } from '../../services/Plant.service';
import { IPlant } from '../../types/Plant.interface';
import { IGrowthLog } from '../../types/IGrowthLog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

type Props = {
  plantData: IPlant,
  updatedGrowthLogHandler: (updatedGrowthLogs: IGrowthLog) => void;
  editButtonHandler: () => void,
  showingCreateGrowthLogForm: boolean
};

const CreateGrowthLogForm: React.FC<Props> = ({
  plantData,
  updatedGrowthLogHandler,
  editButtonHandler,
  showingCreateGrowthLogForm
}) => {
  const [plantImgInput, setPlantImgInput] = useState<string | null>(null);
  const [numberOfLeavesInput, setNumberOfLeaves] = useState<number | null>(null);
  const [heightInput, setHeightInput] = useState<number | null>(null);

  const handleCreateFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (plantData && numberOfLeavesInput && heightInput && plantImgInput) {
      const newGrowthLog = await createGrowthLog(plantData._id, numberOfLeavesInput, heightInput, plantImgInput);
      updatedGrowthLogHandler(newGrowthLog);
      const growthForm = document.getElementById('createGrowthLogForm') as HTMLFormElement | null;

      if (growthForm) {
        growthForm.reset();
      };
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
    <Row style={{ margin: '1vh auto' }}>
      <Col xs={10}>
        <h3>Growth Logs</h3>
      </Col>
      <Col xs={2}>
        {showingCreateGrowthLogForm ?
          <Button onClick={editButtonHandler} variant="outline-danger">
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        :
          <Button onClick={editButtonHandler} variant="outline-success">
            <FontAwesomeIcon icon={faPlus}/>
          </Button>
        }
      </Col>
    </Row>
    <Row>
    <Form id="createGrowthLogForm" onSubmit={handleCreateFormSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Plant Image</Form.Label>
        <Form.Control
          id="plantPhoto"
          name="plantPhoto"
          type="file"
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
          required={true}
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
          required={true}
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