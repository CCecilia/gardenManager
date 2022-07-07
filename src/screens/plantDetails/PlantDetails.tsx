import React, { useEffect, useState } from 'react';

import { IPlant } from '../../types/Plant.interface';
import { createGrowthLog, deletePlantData, getPlantData, updatePlantData } from '../../services/Plant.service';
import { titleCase } from '../../utilities/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIdFromLocation } from '../../utilities/StringHelpers';
import { RoutePaths } from '../../types/RoutePaths.enum';
import { useAuth } from '../../hooks/useAuth';
import { IGrowthLog } from '../../types/IGrowthLog';
import { Carousel } from 'react-bootstrap';

type Props = {
};
interface GrowthStage {
  cycleNumber: number;
  name: string;
};

const PlantDetails: React.FC<Props> = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [plantData, setPlantData] = useState<IPlant | null>(null);
  const [commonNameInput, setCommonNameInput] = useState<string | null>(null);
  const [genusInput, setGenusInput] = useState<string | null>(null);
  const [speciesInput, setSpeciesInput] = useState<string | null>(null);
  const [hoursOfLightInput, setHoursOfLightInput] = useState<number | null>(null);
  const [lumenExposureInput, setLumenExposureInput] = useState<number | null>(null);
  const [growthStageInput, setGrowthStageInput] = useState<string | null>(null);
  const [harvestedCheckBox, setHarvestedCheckBox] = useState<boolean | null>(null);
  const [plantImgInput, setPlantImgInput] = useState<string | null>(null);
  const [numberOfLeavesInput, setNumberOfLeaves] = useState<number | null>(null);
  const [heightInput, setHeightInput] = useState<number | null>(null);

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

  const handleGrowthLogFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (plantData && numberOfLeavesInput && heightInput && plantImgInput) {
      console.log(plantImgInput, numberOfLeavesInput, heightInput, plantData?._id);
      await createGrowthLog(plantData._id, numberOfLeavesInput, heightInput, plantImgInput);
    }
  };

  const handleUpdateFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      if (lumenExposureInput) {
        plantData.numberOfLumensExposure = lumenExposureInput;
      };
      if (growthStageInput) {
        plantData.currentStage = JSON.parse(growthStageInput);
      };
      if (harvestedCheckBox !== null) {
        plantData.harvested = harvestedCheckBox;
      };

      await updatePlantData(plantData as Partial<IPlant>).catch((error) => {
        console.error(error);
      });
      setPlantData(plantData);
      const updateForm = document.getElementById('updatePlantForm') as HTMLFormElement | null;
      if (updateForm) {
        updateForm.reset();
      }
    };
  };

  const handleUpdateFormInputOnChange = (event: React.FormEvent<HTMLInputElement>, setStateAction: (data: any) => void) => {
    const { value } = event.currentTarget;
    setStateAction(value);
  };

  const handleUpdateFormSelectOnChange = (event: React.FormEvent<HTMLSelectElement>, setStateAction: (data: any) => void) => {
    const { value } = event.currentTarget;
    setStateAction(value);
  };

  const handleUpdateFormCheckOnChange = (event: React.FormEvent<HTMLInputElement>, setStateAction: (data: any) => void) => {
    const { checked } = event.currentTarget;
    console.log(checked);
    setStateAction(checked);
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

  return (
    <>
      {plantData &&
        <div className="row">
          <div className="row">
            <h3>
              { commonNameInput || titleCase(plantData.commonName)}&nbsp;
            </h3>
            <small className="text-muted">ID: {plantData._id}</small>
          </div>
          <div className="row">
            <form id="updatePlantForm" onSubmit={handleUpdateFormSubmit}>
              <div className="form-row">
                <div className="form-group col-6">
                  <label htmlFor="commonName">Common Name - { commonNameInput || titleCase(plantData.commonName) }</label>
                  <input
                    id="commonName"
                    name="commonName"
                    placeholder="Common Name"
                    className="form-control"
                    onChange={(e) => handleUpdateFormInputOnChange(e, setCommonNameInput)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-6">
                  <label htmlFor="genus">Genus - { titleCase(plantData.genus) }</label>
                  <input
                    id="genus"
                    name="genus"
                    placeholder="Genus"
                    className="form-control"
                    onChange={(e) => handleUpdateFormInputOnChange(e, setGenusInput)}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="species">Species - { titleCase(plantData.species) }</label>
                  <input
                    id="species"
                    name="species"
                    placeholder="Species"
                    className="form-control"
                    onChange={(e) => handleUpdateFormInputOnChange(e, setSpeciesInput)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-6">
                  <label htmlFor="height">Hours Of Light - { hoursOfLightInput || plantData.hoursOfLight }</label>
                  <input
                    id="hoursOfLight"
                    name="hoursOfLight"
                    placeholder="Hours Of Light"
                    className="form-control"
                    onChange={(e) => handleUpdateFormInputOnChange(e, setHoursOfLightInput) }
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="numberOfLumensExposure">Number Of Lumens Exposure - { lumenExposureInput || plantData.numberOfLumensExposure }</label>
                  <input
                    id="numberOfLumensExposure"
                    name="numberOfLumensExposure"
                    placeholder="Number Of Lumens Exposure"
                    className="form-control"
                    onChange={(e) => handleUpdateFormInputOnChange(e, setLumenExposureInput)}
                  />
                </div>
              </div>
              <div className="form-row">
                {harvestedCheckBox !== null ?
                  <div className="form-group col-6">
                    <input
                      type="checkbox"
                      name="harvested"
                      checked={harvestedCheckBox}
                      onChange={(e) => handleUpdateFormCheckOnChange(e, setHarvestedCheckBox)}
                    />
                    <label className="form-check-label" htmlFor="harvested">
                      {harvestedCheckBox ? 'Harvested ' : 'Not Harvested'}
                    </label>
                  </div>
                :
                  <div className="form-group col-6">
                    <input
                      type="checkbox"
                      name="harvested"
                      checked={plantData.harvested}
                      onChange={(e) => handleUpdateFormCheckOnChange(e, setHarvestedCheckBox)}
                    />
                    <label className="form-check-label" htmlFor="harvested">
                      {plantData.harvested ? 'Harvested' : 'Not Harvested'}
                    </label>
                  </div>
                }
                <div className="form-group col-6">
                  <select name="currentStage" onChange={(e) => handleUpdateFormSelectOnChange(e, setGrowthStageInput)}>
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
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <button type="submit" className="btn btn-primary">Update</button>
                  &nbsp;
                  {plantData?._id &&
                    <a className="btn btn-danger active" onClick={(event) => handleDeleteButtonClick(event, plantData._id)}>Delete</a>
                  }
                </div>
              </div>
            </form>
          </div>
          {plantData.growthLogs.length &&
            <div className="row">
              <div className="row">
                <h3>Growth Logs</h3>
              </div>
              <Carousel>
                {plantData.growthLogs.map((growthLog: IGrowthLog, index: number) => {
                  return <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={growthLog.img}
                      alt={plantData.commonName}
                    />
                    <Carousel.Caption>
                      <h3>Date: { new Date(growthLog.dateCreated).toLocaleDateString() }</h3>
                      <p>
                        Height: {growthLog.heightInches} in. <br/>
                        Leaves: {growthLog.numbersOfLeaves} <br/>
                        Stage: {growthLog.currentStage.name}
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>;
                })}
              </Carousel>
            </div>
          }
          <div className="row">
            <div className="row">
              <h3>Add Growth Log</h3>
            </div>
            <form  id="createGrowthLogForm" onSubmit={handleGrowthLogFormSubmit}>
              <div className="form-row">
                <div className="form-group col-6">
                  <label htmlFor="plantPhoto">Photo</label>
                  <input type="file" name="plantPhoto" onChange={handleCreateGrowthLogImgInputOnChange}/>
                </div>
                {plantImgInput &&
                  <div className="form-group col-6">
                    <img id="previewPlantImg" width="auto" height="500" src={plantImgInput}></img>
                  </div>
                }
                <div className="form-group col-6">
                  <label htmlFor="numbersOfLeaves">Numbers Of Leaves</label>
                  <input
                    id="numbersOfLeaves"
                    name="numbersOfLeaves"
                    className="form-control"
                    onChange={(e) => handleUpdateFormInputOnChange(e, setNumberOfLeaves)}
                    type="number"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="heightInches">Height (in.)</label>
                  <input
                    id="heightInches"
                    name="heightInches"
                    className="form-control"
                    onChange={(e) => handleUpdateFormInputOnChange(e, setHeightInput)}
                    type="number"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default PlantDetails;
