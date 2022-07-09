import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { GrowthStage, IPlant } from '../../types/Plant.interface';
import { titleCase } from '../../utilities/Typography';
import { updatePlantData } from '../../services/Plant.service';

type Props = {
  plantData: IPlant
  updatedPlantDataHandler: (data: IPlant) => void;
};

const PlantUpdateForm: React.FC<Props> = ({plantData, updatedPlantDataHandler}) => {
  const [commonNameInput, setCommonNameInput] = useState<string | null>(null);
  const [genusInput, setGenusInput] = useState<string | null>(null);
  const [speciesInput, setSpeciesInput] = useState<string | null>(null);
  const [hoursOfLightInput, setHoursOfLightInput] = useState<number | null>(null);
  const [numberOfLumensExposureInput, setNumberOfLumensExposureInput] = useState<number | null>(null);
  const [growthStageInput, setGrowthStageInput] = useState<string | null>(null);
  const [harvestedCheckBox, setHarvestedCheckBox] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    if (plantData) {
      if (commonNameInput) {
        plantData.commonName = commonNameInput;
      };
      if (genusInput) {
        plantData.genus = genusInput;
      };
      if (speciesInput) {
        plantData.species = speciesInput;
      };
      if (hoursOfLightInput) {
        plantData.hoursOfLight = hoursOfLightInput;
      };
      if (numberOfLumensExposureInput) {
        plantData.numberOfLumensExposure = numberOfLumensExposureInput;
      };
      if (growthStageInput) {
        plantData.currentStage = JSON.parse(growthStageInput);
      };
      if (harvestedCheckBox !== null) {
        plantData.harvested = harvestedCheckBox;
      };
      console.log(plantData);
      // eslint-disable-next-line no-debugger
      debugger;
      await updatePlantData(plantData as Partial<IPlant>).catch((error) => {
        console.error(error);
      });
      updatedPlantDataHandler(plantData);
      const updateForm = document.getElementById('updatePlantForm') as HTMLFormElement | null;
      if (updateForm) {
        updateForm.reset();
      }
      setLoading(false);
    };
  };

  const handleUpdateFormInputOnChange = (event: React.FormEvent<HTMLInputElement>, setStateAction: (data: any) => void) => {
    const { value } = event.currentTarget;
    setStateAction(value);
  };

  const handleUpdateFormCheckOnChange = (event: React.FormEvent<HTMLInputElement>, setStateAction: (data: any) => void) => {
    const { checked } = event.currentTarget;
    setStateAction(checked);
  };

  const handleUpdateFormSelectOnChange = (event: React.FormEvent<HTMLSelectElement>, setStateAction: (data: any) => void) => {
    const { value } = event.currentTarget;
    setStateAction(value);
  };

  return <Row>
    <Form onSubmit={handleUpdateFormSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Common Name</Form.Label>
        <Form.Control
          id="commonName"
          name="commonName"
          placeholder={
            plantData ? titleCase(plantData.commonName) : 'Common Name'
          }
          className="form-control"
          value={commonNameInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setCommonNameInput)}
        />
        <Form.Text className="text-muted">
          current: {titleCase(plantData.commonName)}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Genus</Form.Label>
        <Form.Control
          id="genus"
          name="genus"
          placeholder={
            plantData ? titleCase(plantData.genus) : 'Genus'
          }
          className="form-control"
          value={genusInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setGenusInput)}
        />
        <Form.Text className="text-muted">
          current: {titleCase(plantData.genus)}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Species</Form.Label>
        <Form.Control
          id="species"
          name="species"
          placeholder={
            plantData ? titleCase(plantData.species) : 'Species'
          }
          className="form-control"
          value={speciesInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setSpeciesInput)}
        />
        <Form.Text className="text-muted">
          current: {titleCase(plantData.species)}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Hours Of Light</Form.Label>
        <Form.Control
          id="hoursOfLight"
          name="hoursOfLight"
          placeholder={
            plantData ? plantData.hoursOfLight.toString() : 'Hours Of Light'
          }
          className="form-control"
          value={hoursOfLightInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setHoursOfLightInput)}
        />
        <Form.Text className="text-muted">
          current: {plantData.hoursOfLight.toString()}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Number Of Lumens Exposure</Form.Label>
        <Form.Control
          id="numberOfLumensExposure"
          name="numberOfLumensExposure"
          placeholder={
            plantData ? plantData.numberOfLumensExposure.toString() : 'Number Of Lumens Exposure'
          }
          className="form-control"
          value={numberOfLumensExposureInput || ''}
          onChange={(e: any) => handleUpdateFormInputOnChange(e, setNumberOfLumensExposureInput)}
        />
        <Form.Text className="text-muted">
          current: {plantData.numberOfLumensExposure.toString()}
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Growth Stage</Form.Label>
        <Form.Select
          name="growthStage"
          aria-label="growth-stage-select"
          defaultValue={JSON.stringify(plantData.currentStage)}
          onChange={(e: any) => handleUpdateFormSelectOnChange(e, setGrowthStageInput)}
        >
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
        </Form.Select>
      </Form.Group>
      {harvestedCheckBox !== null ?
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            name="harvested"
            type="checkbox"
            label={harvestedCheckBox ? 'Harvested ' : 'Not Harvested'}
            checked={harvestedCheckBox}
            onChange={(e: any) => handleUpdateFormCheckOnChange(e, setHarvestedCheckBox)}
          />
        </Form.Group>
      :
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            name="harvested"
            type="checkbox"
            label={plantData.harvested ? 'Harvested ' : 'Not Harvested'}
            checked={plantData.harvested}
            onChange={(e: any) => handleUpdateFormCheckOnChange(e, setHarvestedCheckBox)}
          />
        </Form.Group>
      }
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  </Row>;
};

export default PlantUpdateForm;