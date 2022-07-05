import { Location } from 'react-router-dom';

export const getIdFromLocation = (location: Location): string => {
  const { pathname } = location;
  // eslint-disable-next-line no-unused-vars
  const [_empty, _base, id] = pathname.split('/');

  return id;
};
