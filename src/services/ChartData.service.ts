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

export const getPlantGrowthChartData = async (plantId: string): Promise<ChartData> => {
  const response = await axios.get(endpointService.plantGrowthChartData, {
    headers: getHeaders(),
    params: {
      plantId
    }
  });

  return response.data as ChartData;
};

export const getCropGrowthChartData = async (cropId: string): Promise<ChartData> => {
  const response = await axios.get(endpointService.cropGrowthChartData, {
    headers: getHeaders(),
    params: {
      cropId
    }
  });

  return response.data as ChartData;
};