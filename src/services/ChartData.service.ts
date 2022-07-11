import EndpointService from './Endpoint.service';
import { makeRequest } from './Network.service';

const endpointService = new EndpointService();

export type ChartData = {
  label: string,
  datasets: any[],
  borderColor: string,
  backgroundColor: string
}

export const getPlantGrowthChartData = async (plantId: string): Promise<ChartData> => {
  const uri = `${endpointService.plantGrowthChartData}?plantId=${plantId}`;
  const response = await makeRequest<ChartData>(uri, {
    method: 'GET',
  });

  return response;
};

export const getCropGrowthChartData = async (cropId: string): Promise<ChartData> => {
  const uri = `${endpointService.cropGrowthChartData}?cropId=${cropId}`;
  const response = await makeRequest<ChartData>(uri, {
    method: 'GET',
  });

  return response;
};