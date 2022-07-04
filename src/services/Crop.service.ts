import EndpointService from './Endpoint.service';
import { ICrop } from '../types/Crop.interface';
import axios from 'axios';
import { getHeaders } from './Header.service';


export const getCropData = async (id?: string): Promise<ICrop | ICrop[]> => {
  const endpointService = new EndpointService();

  if (id) {
    const response = await axios.get(endpointService.getCropDataById(id), {
      headers: getHeaders(),
    });

    return response.data as ICrop;
  }

  const response = await axios.get(endpointService.allCropData, {
    headers: getHeaders(),
  });

  return response.data as ICrop[];
};
