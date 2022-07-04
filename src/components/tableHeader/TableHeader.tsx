import React from 'react';

type Props = {
  header: string;
};

const TableHeader: React.FC<Props> = ({ header }) => {
  return <th scope="col">{header}</th>;
};

export default TableHeader;
