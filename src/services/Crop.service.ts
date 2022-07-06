import { INutrientBatch } from './../types/INutrientBatch';
import EndpointService from './Endpoint.service';
import { ICrop } from '../types/Crop.interface';
import axios, { AxiosResponse } from 'axios';
import { getHeaders } from './Header.service';
import { IPlant } from '../types/Plant.interface';

const endpointService = new EndpointService();


export const getCropData = async (id: string): Promise<ICrop> => {
  const response = await axios.get(endpointService.getCropDataById(id), {
    headers: getHeaders(),
  });

  return response.data as ICrop;
};

export const getAllCropData = async (): Promise<ICrop[]> => {
  const response: AxiosResponse = await axios.get(endpointService.allCropData, {
    headers: getHeaders(),
  });

  return response.data as ICrop[];
};

export const updateCropData = async (update: Partial<ICrop>): Promise<ICrop> => {  
  const response = await axios.put(endpointService.allCropData, {...update}, {
    headers: getHeaders(),
  });

  return response.data as ICrop;
};


export const getCropPlantData = async (plantIds: string[]): Promise<IPlant[]> => {
  const response = await axios.get(endpointService.cropPlantData, {
    headers: getHeaders(),
    params: {plantIds: plantIds.join(',')}
  });

  return response.data as IPlant[];
};


export const getCropNutrientBatchData = async (nutrientBatchIds: string[]): Promise<INutrientBatch[]> => {
  const response = await axios.get(endpointService.cropNutrientBatchData, {
    headers: getHeaders(),
    params: {nutrientBatchIds: nutrientBatchIds.join(',')}
  });

  return response.data as INutrientBatch[];
};
