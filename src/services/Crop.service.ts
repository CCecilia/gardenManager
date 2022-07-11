import { makeRequest } from './Network.service';
import { INutrientBatch } from './../types/INutrientBatch';
import EndpointService from './Endpoint.service';
import { ICrop } from '../types/Crop.interface';
import { IPlant } from '../types/Plant.interface';

const endpointService = new EndpointService();


export const getCropData = async (id: string): Promise<ICrop> => {
  const response = await makeRequest<ICrop>(endpointService.getCropDataById(id), {
    method: 'GET',
  });
  return response;
};

export const getAllCropData = async (): Promise<ICrop[]> => {
  const response = await makeRequest<ICrop[]>(endpointService.allCropData, {
    method: 'GET',
  });

  return response;
};

export const updateCropData = async (update: Partial<ICrop>): Promise<ICrop> => {
  const response = await makeRequest<ICrop>(endpointService.allCropData, {
    method: 'PUT',
    body: JSON.stringify(update)
  });

  return response;
};


export const getCropPlantData = async (plantIds: string[]): Promise<IPlant[]> => {
  const uri = `${endpointService.cropPlantData}?plantIds=${plantIds.join(',')}`;
  const response = await makeRequest<IPlant[]>(uri, {
    method: 'GET'
  });

  return response;
};


export const getCropNutrientBatchData = async (nutrientBatchIds: string[]): Promise<INutrientBatch[]> => {
  const uri = `${endpointService.cropNutrientBatchData}?nutrientBatchIds=${nutrientBatchIds.join(',')}`;
  const response = await makeRequest<INutrientBatch[]>(uri, {
    method: 'GET'
  });

  return response;
};
