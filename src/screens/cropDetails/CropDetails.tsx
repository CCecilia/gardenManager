import React, { useEffect, useState } from 'react';
import { useLocation, /* useNavigate */ } from 'react-router-dom';
import { getCropData, getCropPlantData, updateCropData } from '../../services/Crop.service';
import { ICrop } from '../../types/Crop.interface';
import { IPlant } from '../../types/Plant.interface';
import { getIdFromLocation } from '../../utilities/StringHelpers';
import { titleCase } from '../../utilities/Typography';
import PlantsTable from '../../components/plantsTable';

type Props = {};

const CropDetails: React.FC<Props> = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const [cropData, setCropData] = useState<ICrop | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cropName, setCropName] = useState<string>('');
  const [cropPlantData, setCropPlantData] = useState<IPlant[] | null>(null);

  useEffect(() => {
    (async () => {
      const id = getIdFromLocation(location);
      const data: ICrop = await getCropData(id);
      const plantData = await getCropPlantData(data.plants);
      setCropData(data);
      // eslint-disable-next-line no-debugger
      debugger;
      setCropPlantData(plantData);
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
    <div className="row">
      {cropData &&
        <div className="row">
          <h3>
            {titleCase(cropData.name)}&nbsp;
          </h3>
          <small className="text-muted">
            ID: {cropData._id}
          </small>
          <small className="text-muted">Date Created: { new Date(cropData.dateCreated).toLocaleDateString() }</small>
        </div>
      }
    </div>
    <div className="row">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-6">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              placeholder={
                cropData ? titleCase(cropData.name) : 'Name'
              }
              className="form-control"
              value={cropName}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group col-6">
            <label htmlFor="id">ID</label>
            <input
              id="id"
              name="id"
              placeholder={cropData ? titleCase(cropData._id) : 'ID'}
              className="form-control"
              readOnly={true}
              value={cropData ? titleCase(cropData._id) : 'ID'}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
    <div className="row">
      <div className="col-12">
        <h2 className="heading">Plants</h2>
      </div>
      <div className="col-12">
        {cropPlantData &&
          <PlantsTable plants={cropPlantData}/>
        }
      </div>
    </div>
  </>;
};

export default CropDetails;