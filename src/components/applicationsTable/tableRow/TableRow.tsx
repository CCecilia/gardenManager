import React from 'react';
import { deleteNutrientBatchApplication } from '../../../services/NutrientBatch.service';
import { INutrientBatchApplication } from '../../../types/INutrientBatchApplication';

type Props = {
  applicationData: INutrientBatchApplication;
};
const handleDeleteClick = async (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  id: string
) => {
  event.preventDefault();
  const results = await deleteNutrientBatchApplication(id);
  console.log(results);
  window.location.reload();
};

const TableRow: React.FC<Props> = ({ applicationData }) => {
  return (
    <tr>
      <td>{new Date(applicationData.dateCreated).toLocaleDateString()}</td>
      <td>{applicationData.amountUsedMls}</td>
      <td><button className='btn btn-danger' onClick={(e) => handleDeleteClick(e, applicationData._id)}>Delete</button></td>
    </tr>
  );
};

export default TableRow;
