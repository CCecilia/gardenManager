import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../types/RoutePaths.enum';
import { INutrientBatch } from '../../../types/INutrientBatch';

type Props = {
  nutrientBatchData: INutrientBatch;
};

const TableRow: React.FC<Props> = ({ nutrientBatchData }) => {
  const navigate = useNavigate();

  const handleRowDblClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();

    navigate(RoutePaths.NUTRIENT_BATCH_DETAILS_ROUTE.replace(':id', id));
  };

  return (
    <tr onDoubleClick={(e) => handleRowDblClick(e, nutrientBatchData._id)}>
      <td>{nutrientBatchData._id}</td>
      <td>{new Date(nutrientBatchData.dateCreated).toLocaleDateString()}</td>
      <td>{nutrientBatchData.totalWaterGallons}</td>
      <td>{nutrientBatchData.totalFloraMicroMls}</td>
      <td>{nutrientBatchData.totalFloraBloomMls}</td>
      <td>{nutrientBatchData.totalFloraGroMls}</td>
      <td>{nutrientBatchData.phDownMls}</td>
      <td>{nutrientBatchData.phUpMls}</td>
      <td>{nutrientBatchData.startingPh}</td>
      <td>{nutrientBatchData.endingPh}</td>
      <td>{nutrientBatchData.applications.length}</td>
    </tr>
  );
};

export default TableRow;
