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
    <tr onClick={(e) => handleRowDblClick(e, nutrientBatchData._id)}>
      <td>{new Date(nutrientBatchData.dateCreated).toLocaleDateString()}</td>
      <td>{nutrientBatchData.totalWaterGallons}</td>
      <td>{nutrientBatchData.totalFloraMicroMls}</td>
      <td>{nutrientBatchData.totalFloraBloomMls}</td>
      <td>{nutrientBatchData.totalFloraGroMls}</td>
    </tr>
  );
};

export default TableRow;
