import EndpointService from './Endpoint.service';
import { ICrop } from '../types/Crop.interface';
import axios, { AxiosResponse } from 'axios';
import { getHeaders } from './Header.service';
import { IPlant } from '../types/Plant.interface';


export const getCropData = async (id: string): Promise<ICrop> => {
  console.log('getCropData | executed', id);
  const endpointService = new EndpointService();
  // // eslint-disable-next-line no-debugger
  // debugger;
  const response = await axios.get(endpointService.getCropDataById(id), {
    headers: getHeaders(),
  });
  console.log('response.data ', response.data);
  return response.data as ICrop;
};

export const getAllCropData = async (): Promise<ICrop[]> => {
  console.log('getAllCropData | executed');
  const endpointService = new EndpointService();

  const response: AxiosResponse = await axios.get(endpointService.allCropData, {
    headers: getHeaders(),
  });

  return response.data as ICrop[];
};

export const updateCropData = async (update: Partial<ICrop>): Promise<ICrop> => {
  const endpointService = new EndpointService();

  const response = await axios.put(endpointService.allCropData, {...update}, {
    headers: getHeaders(),
  });

  return response.data as ICrop;
};


export const getCropPlantData = async (plantIds: string[]): Promise<IPlant[]> => {
  // eslint-disable-next-line no-debugger
  // debugger;
  const endpointService = new EndpointService();

  const response = await axios.get(endpointService.cropPlantData, {
    headers: getHeaders(),
    params: {plantIds: plantIds.join(',')}
  });

  return response.data as IPlant[];
};
