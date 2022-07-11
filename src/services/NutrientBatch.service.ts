import { INutrientBatch } from './../types/INutrientBatch';
import EndpointService from './Endpoint.service';
import { makeRequest } from './Network.service';

const endpointService = new EndpointService();

export const getAllNutrientBatches = async () => {
  const response = await makeRequest<INutrientBatch[]>(endpointService.allNutrientBatchData, {
    method: 'GET',
  });

  return response;
};

export const getNutrientBatchData = async (id: string): Promise<INutrientBatch> => {
  const response = await makeRequest<INutrientBatch>(endpointService.getNutrientBatchById(id), {
    method: 'GET',
  });

  return response;
};

export const updateNutrientBatchData = async (update: Partial<INutrientBatch>): Promise<INutrientBatch> => {  
  const response = await makeRequest<INutrientBatch>(endpointService.allNutrientBatchData, {
    method: 'PUT',
    body: JSON.stringify(update)
  });

  return response;
};

export const createNutrientBatchApplication = async (amountUsed: number, nutrientBatchId: string) => {
  const response = await makeRequest<INutrientBatch>(endpointService.allNutrientBatchData, {
    method: 'POST',
    body: JSON.stringify({
      amountUsed,
      nutrientBatchId
    })
  });

  return response;
};

export const deleteNutrientBatchApplication = async (applicationId: string) => {
  const uri = `${endpointService.allNutrientBatchData}?applicationId=${applicationId}`;
  const response = await makeRequest<INutrientBatch>(uri, {
    method: 'DELETE'
  });

  return response;
};