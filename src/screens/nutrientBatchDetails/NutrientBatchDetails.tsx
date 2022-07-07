import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApplicationTable from '../../components/applicationsTable';
import { useAuth } from '../../hooks/useAuth';
import { createNutrientBatchApplication, getNutrientBatchData, updateNutrientBatchData } from '../../services/NutrientBatch.service';
import { INutrientBatch } from '../../types/INutrientBatch';
import { getIdFromLocation } from '../../utilities/StringHelpers';
import { Modal, Button } from 'react-bootstrap';

type Props = {};

type FormData = {
  totalWaterGallons: number | null,
  totalFloraMicroMls: number | null,
  totalFloraBloomMls: number | null,
  totalFloraGroMls: number | null,
  phDownMls: number | null,
  phUpMls: number | null,
  startingPh: number | null,
  endingPh: number | null
}

const NutrientBatchDetails: React.FC<Props> = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [nutrientBatchData, setNutrientBatchData] = useState<INutrientBatch | null>(null);
  const [formData, setFormData] = useState<FormData>({
    totalWaterGallons: null,
    totalFloraMicroMls: null,
    totalFloraBloomMls: null,
    totalFloraGroMls: null,
    phDownMls: null,
    phUpMls: null,
    startingPh: null,
    endingPh: null,
  });
  const [amountUsed, setAmountUsed] = useState<number>(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    (async () => {
      if (auth) {
        const [shouldRedirect, redirectRoute] = auth.shouldRedirect();

        if (shouldRedirect && redirectRoute) {
          navigate(redirectRoute);
        };

        const id = getIdFromLocation(location);
        const data: INutrientBatch = await getNutrientBatchData(id);
        setFormData(Object.assign(formData, data));
        setNutrientBatchData(data);
      }
    })();
  }, []);

  const handleModalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading || !nutrientBatchData) {
      return;
    }
    setLoading(true);

    const updated = await createNutrientBatchApplication(amountUsed, nutrientBatchData._id);
    setShow(false);
    console.log(updated);
    setNutrientBatchData(updated);
    setLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading || !nutrientBatchData) {
      return;
    }
    setLoading(true);

    if (formData.totalWaterGallons) {
      nutrientBatchData.totalWaterGallons = formData.totalWaterGallons;
    }

    await updateNutrientBatchData(nutrientBatchData).catch((err) => {
      console.error(err);
    });

    setLoading(false);
  };

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;

    setFormData(Object.assign(formData, { [name]: value }));
  };

  const handleModalOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    let used = 0;

    if (value && value !== '') {
      used = parseInt(value);
    };

    setAmountUsed(used);
  };

  return <>
    {nutrientBatchData &&
      <>
        <div className="row">
          <h3>
            Nutrient Batch
          </h3>
          <small className="text-muted">
            ID: {nutrientBatchData._id}
          </small>
          <small className="text-muted">Date Created: {new Date(nutrientBatchData.dateCreated).toLocaleDateString()}</small>
        </div>
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="totalWaterGallons">Total Amount of Water</label>
                <input
                  id="totalWaterGallons"
                  name="totalWaterGallons"
                  className="form-control"
                  value={formData.totalWaterGallons ? formData.totalWaterGallons : '0'}
                  onChange={handleOnChange}
                  type="number"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="totalFloraMicroMls">Total Flora Micro Mls</label>
                <input
                  id="totalFloraMicroMls"
                  name="totalFloraMicroMls"
                  className="form-control"
                  value={formData.totalFloraMicroMls ? formData.totalFloraMicroMls : '0'}
                  onChange={handleOnChange}
                  type="number"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="totalFloraBloomMls">Total Flora Bloom Mls</label>
                <input
                  id="totalFloraBloomMls"
                  name="totalFloraBloomMls"
                  className="form-control"
                  value={formData.totalFloraBloomMls ? formData.totalFloraBloomMls : '0'}
                  onChange={handleOnChange}
                  type="number"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="totalFloraGroMls">Total Flora Gro Mls</label>
                <input
                  id="totalFloraGroMls"
                  name="totalFloraGroMls"
                  className="form-control"
                  value={formData.totalFloraGroMls ? formData.totalFloraGroMls : '0'}
                  onChange={handleOnChange}
                  type="number"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="phDownMls">PH Down Mls</label>
                <input
                  id="phDownMls"
                  name="phDownMls"
                  className="form-control"
                  value={formData.phDownMls ? formData.phDownMls : '0'}
                  onChange={handleOnChange}
                  type="number"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="phUpMls">PH Up Mls</label>
                <input
                  id="phUpMls"
                  name="phUpMls"
                  className="form-control"
                  value={formData.phUpMls ? formData.phUpMls : '0'}
                  onChange={handleOnChange}
                  type="number"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="startingPh">Starting PH</label>
                <input
                  id="startingPh"
                  name="startingPh"
                  className="form-control"
                  value={formData.startingPh ? formData.startingPh : '0'}
                  onChange={handleOnChange}
                  type="number"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="endingPh">Ending PH</label>
                <input
                  id="endingPh"
                  name="endingPh"
                  className="form-control"
                  value={formData.endingPh ?  formData.endingPh : '0'}
                  onChange={handleOnChange}
                  type="number"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
        <div className="row">
          <div className="col-12">
            <h3>Applications</h3>
          </div>
          <div className="col-12">
            <ApplicationTable applications={nutrientBatchData.applications} />
            <Button variant="primary" onClick={handleShow}>
              Add Application
            </Button>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="addApplicationForm" onSubmit={handleModalSubmit}>
              <div className="form-row">
                <div className="form-group col-12">
                  <label htmlFor="amountUsed">Amount Used</label>
                <input
                    type="number"
                    id="amountUsed"
                    name="amountUsed"
                    placeholder={
                      amountUsed.toString()
                    }
                    className="form-control"
                    value={amountUsed}
                    onChange={handleModalOnChange}
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" type="submit" form="addApplicationForm">
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    }
  </>;
};

export default NutrientBatchDetails;