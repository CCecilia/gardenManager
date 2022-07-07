import { getHeaders } from './Header.service';
import EndpointService from './Endpoint.service';
import axios from 'axios';

const endpointService = new EndpointService();

export const search = async (query: string): Promise<any[]> => {
  const response = await axios.get(endpointService.search, {
    headers: getHeaders(),
    params: {query: encodeURIComponent(query)}
  });

  return response.data as any[];
};