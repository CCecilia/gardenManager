import { ICrop } from '../../../types/Crop.interface';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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

    navigate(`/crops/${id}`);
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
