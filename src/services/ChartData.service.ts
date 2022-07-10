import axios from 'axios';
import EndpointService from './Endpoint.service';
import { getHeaders } from './Header.service';

const endpointService = new EndpointService();

export type ChartData = {
  label: string,
  datasets: any[],
  borderColor: string,
  backgroundColor: string
}

export const getPlantGrowthOverTimeData = async (plantId: string) => {
  const response = await axios.get(endpointService.plantGrowthOverTimeData, {
    headers: getHeaders(),
    params: {
      plantId
    }
  });

  return response.data as ChartData;
};