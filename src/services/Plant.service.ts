import EndpointService from './Endpoint.service';
import { IPlant } from '../types/Plant.interface';
import axios from 'axios';
import { getHeaders } from './Header.service';

export const getPlantData = async (id?: string): Promise<IPlant[] | IPlant> => {
  const endpointService = new EndpointService();
  if (id) {
    const response = await axios.get(endpointService.getPlantDataById(id), {
      headers: getHeaders(),
    });

    return response.data as IPlant;
  }

  const response = await axios.get(endpointService.allPlantData, {
    headers: getHeaders(),
  });

  return response.data as IPlant[];
};
