import { INutrientBatch } from './../types/INutrientBatch';
import axios from 'axios';
import EndpointService from './Endpoint.service';
import { getHeaders } from './Header.service';

const endpointService = new EndpointService();

export const getAllNutrientBatches = async () => {
  const response = await axios.get(endpointService.allNutrientBatchData, {
    headers: getHeaders(),
  });

  return response.data as INutrientBatch[];
};

export const getNutrientBatchData = async (id: string): Promise<INutrientBatch> => {
  const response = await axios.get(endpointService.getNutrientBatchById(id), {
    headers: getHeaders(),
  });

  return response.data as INutrientBatch;
};

export const updateNutrientBatchData = async (update: Partial<INutrientBatch>): Promise<INutrientBatch> => {  
  const response = await axios.put(endpointService.allNutrientBatchData, {...update}, {
    headers: getHeaders(),
  });

  return response.data as INutrientBatch;
};

export const createNutrientBatchApplication = async (amountUsed: number, nutrientBatchId: string) => {
  const response = await axios.post(endpointService.createNutrientBatchApplication, {amountUsed, nutrientBatchId}, {
    headers: getHeaders(),
  });

  return response.data as INutrientBatch;
};

export const deleteNutrientBatchApplication = async (applicationId: string) => {
  const response = await axios.delete(endpointService.createNutrientBatchApplication, {
    headers: getHeaders(),
    params: {
      applicationId
    }
  });

  return response.data as INutrientBatch;
};