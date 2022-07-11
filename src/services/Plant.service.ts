import EndpointService from './Endpoint.service';
import { IPlant } from '../types/Plant.interface';
import { IGrowthLog } from '../types/IGrowthLog';
import { makeRequest } from './Network.service';

const endpointService = new EndpointService();

export const getPlantDataById = async (id: string): Promise<IPlant> => {
  const response = await makeRequest<IPlant>(endpointService.getPlantDataById(id), {
    method: 'GET',
  });

  return response;
};

export const getPlantData = async (): Promise<IPlant[]> => {
  const response = await makeRequest<IPlant[]>(endpointService.allPlantData, {
    method: 'GET',
  });

  return response;
};

export const updatePlantData = async (update: Partial<IPlant>): Promise<IPlant> => {
  if (update.growthLogs?.length) {
    delete update.growthLogs;
  }

  const response = await makeRequest<IPlant>(endpointService.allPlantData, {
    method: 'PUT',
    body: JSON.stringify(update)
  });

  return response;
};

export const deletePlantData = async (plantId: string): Promise<boolean> => {
  const uri = `${endpointService.allPlantData}?plantId=${plantId}`;
  const response = await makeRequest<IPlant>(uri, {
    method: 'DELETE',
  });
  if (response) {
    return true;
  }

  return false;
};

export const createGrowthLog = async (plantId: string, numbersOfLeaves: number, heightInches: number, img: string, ): Promise<IGrowthLog> => {
  const response = await makeRequest<IGrowthLog>(endpointService.plantGrowthLog, {
    method: 'GET',
    body: JSON.stringify({
      plantId,
      numbersOfLeaves,
      heightInches,
      img
    })
  });

  return response;
};