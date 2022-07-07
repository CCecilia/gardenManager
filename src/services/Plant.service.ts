import EndpointService from './Endpoint.service';
import { IPlant } from '../types/Plant.interface';
import axios from 'axios';
import { getHeaders } from './Header.service';
import { IGrowthLog } from '../types/IGrowthLog';

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

export const updatePlantData = async (update: Partial<IPlant>): Promise<IPlant> => {
  const endpointService = new EndpointService();

  const response = await axios.put(endpointService.allPlantData, {...update}, {
    headers: getHeaders(),
  });

  return response.data as IPlant;
};

export const deletePlantData = async (plantId: string): Promise<boolean> => {
  const endpointService = new EndpointService();
  const response = await axios.delete(endpointService.allPlantData, {
    headers: getHeaders(),
    params: {
      plantId
    }
  });

  if (response.status === 200) {
    return true;
  }

  return false;
};

export const createGrowthLog = async (plantId: string, numbersOfLeaves: number, heightInches: number, img: string, ): Promise<IGrowthLog> => {
  const endpointService = new EndpointService();

  const response = await axios.post(endpointService.plantGrowthLog, {
    plantId,
    numbersOfLeaves,
    heightInches,
    img
  }, { headers: getHeaders() });

  return response.data as IGrowthLog;
};