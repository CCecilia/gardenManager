import { Location } from 'react-router-dom';

export const getIdFromLocation = (location: Location): string => {
  const { pathname } = location;
  // eslint-disable-next-line no-unused-vars
  const [_empty, _base, id] = pathname.split('/');

  return id;
};

export const validateEmailString = (emailString: string): boolean => {
  const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const results = emailString.match(regexEmail);
  console.log(results);
  if (!results) {
    return false;
  }

  return results.length !== 0;
};