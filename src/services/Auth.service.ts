import axios, { AxiosResponse } from 'axios';

import EndpointService from './Endpoint.service';
import { getHeaders } from './Header.service';

const endpointService = new EndpointService();

export const register = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  const response = await axios.post(
    endpointService.signUp,
    JSON.stringify({
      email,
      password,
    }),
    {
      headers: getHeaders(),
    }
  );

  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response;
};

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  console.log(
    'payload | ',
    JSON.stringify({
      email,
      password,
    })
  );
  const response = await axios.post(
    endpointService.signIn,
    JSON.stringify({
      email,
      password,
    }),
    {
      headers: getHeaders(),
    }
  );

  if (response.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};
