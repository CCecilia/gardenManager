import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApplicationTable from '../../components/applicationsTable';
import { useAuth } from '../../hooks/useAuth';
import { createNutrientBatchApplication, getNutrientBatchData } from '../../services/NutrientBatch.service';
import { INutrientBatch } from '../../types/INutrientBatch';
import { getIdFromLocation } from '../../utilities/StringHelpers';
import { Modal, Button, Row } from 'react-bootstrap';
import DetailsPageHeader from '../../components/detailsPageHeader';
import NutrientBatchUpdateForm from '../../components/nutrientBatchUpdateForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

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
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const openUpdateForm = () => setShowUpdateForm(true);
  const closeUpdateForm = () => setShowUpdateForm(false);

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

    handleClose();
    setNutrientBatchData(updated);
    setLoading(false);
  };

  const handleModalOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    let used = 0;

    if (value && value !== '') {
      used = parseInt(value);
    };

    setAmountUsed(used);
  };

  const handleUpdatedNutrientBatchData = (updatedBatchData: INutrientBatch) => {
    setNutrientBatchData(updatedBatchData);
  };

  return <Row>
    {nutrientBatchData &&
      <>
        <Row>
          <DetailsPageHeader
            name="Nutrient Batch"
            id={nutrientBatchData._id}
            dateCreated={nutrientBatchData.dateCreated}
          />
          {showUpdateForm ?
          <Button
            style={{
              width: '10%',
              textAlign: 'center',
              position: 'absolute',
              top: '9vh',
              right: '10vw',
              zIndex: '99'
            }}
            onClick={closeUpdateForm}
            variant="outline-danger"
          >
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </Button>
        :
          <Button
            style={{
              width: '10%',
              textAlign: 'center',
              position: 'absolute',
              top: '9vh',
              right: '10vw',
              zIndex: '99'
            }}
            onClick={openUpdateForm}
            variant="outline-warning"
          >
            <FontAwesomeIcon icon={faEdit} size="2x" />
          </Button>
        }
        </Row>
        {showUpdateForm &&
          <Row>
            <NutrientBatchUpdateForm
              nutrientBatchData={nutrientBatchData}
              updatedPlantDataHandler={handleUpdatedNutrientBatchData}
            />
          </Row>
      }
      <ApplicationTable
        applications={nutrientBatchData.applications}
        showModal={handleShow}
      />
        <Modal show={showModal} onHide={handleClose}>
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
  </Row>;
};

export default NutrientBatchDetails;