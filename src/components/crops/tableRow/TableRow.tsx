import { ICrop } from '../../../types/Crop.interface';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../types/RoutePaths.enum';

type Props = {
  cropData: ICrop;
};

const TableRow: React.FC<Props> = ({ cropData }) => {
  const navigate = useNavigate();
  const dateCreatedStr = new Date(cropData.dateCreated).toLocaleDateString();

  const handleRowClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();

    navigate(RoutePaths.CROP_DETAILS_ROUTE.replace('{id}', id));
  };

  return (
    <tr onClick={(e) => handleRowClick(e, cropData._id)}>
      <td>{cropData._id}</td>
      <td>{dateCreatedStr}</td>
      <td>{cropData.name}</td>
    </tr>
  );
};

export default TableRow;
