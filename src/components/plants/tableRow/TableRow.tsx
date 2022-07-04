import { IPlant } from '../../../types/Plant.interface';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../types/RoutePaths.enum';

type Props = {
  plantData: IPlant;
};

const TableRow: React.FC<Props> = ({ plantData }) => {
  const navigate = useNavigate();

  const handleRowClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();

    navigate(RoutePaths.PLANT_DETAILS_ROUTE.replace('{id}', id));
  };

  return (
    <tr onClick={(e) => handleRowClick(e, plantData._id)}>
      <td>{plantData._id}</td>
      <td>{plantData.commonName}</td>
      <td>{plantData.dateCreated.toLocaleString()}</td>
      <td>{plantData.growth}</td>
      <td>{plantData.height}</td>
    </tr>
  );
};

export default TableRow;
