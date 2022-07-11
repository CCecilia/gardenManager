import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../types/RoutePaths.enum';

type Props = {};

const Unauthorized: React.FC<Props> = () => {
  return <>
    <h1>Unauthorized</h1>
    <p>
      Please <Link to={RoutePaths.SIGNIN_ROUTE}>sign in</Link>
    </p>
  </>;
};
export default Unauthorized;