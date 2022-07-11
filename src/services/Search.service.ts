import EndpointService from './Endpoint.service';
import { makeRequest } from './Network.service';

const endpointService = new EndpointService();

export const search = async (query: string): Promise<any[]> => {
  const uri = `${endpointService.search}?query=${encodeURIComponent(query)}`;
  const response = await makeRequest<any[]>(uri, {
    method: 'GET',
  });

  return response;
};