import { getHeaders } from './Header.service';

const defaultConfig = () => {
  return {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: getHeaders(),
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };
};

// eslint-disable-next-line no-undef
export const makeRequest = async <T>(url: string, config: RequestInit): Promise<T> => {
  const response = await fetch(url, Object.assign(defaultConfig(), config));
  return response.json();
};