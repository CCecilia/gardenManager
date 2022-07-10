import * as EndpointConfig from '../configs/endpoints.json';

import { EndPoints } from '../configs/endpoints';

// import env from "react-dotenv";

export default class EndpointService {
  // private baseUri: string = env.GARDEN_MANAGER_API;
  private baseUri: string = 'http://192.168.50.112:5000';
  private endpoints: EndPoints = EndpointConfig;

  get signUp(): string {
    return this.baseUri + this.endpoints.user.signUp;
  };

  get signIn(): string {
    return this.baseUri + this.endpoints.user.signIn;
  };

  getPlantDataById(id: string): string {
    return (
      this.baseUri +
      this.endpoints.plant.getPlantDataById.replace('{{plantId}}', id)
    );
  };

  get allPlantData(): string {
    return this.baseUri + this.endpoints.plant.getAllPlantData;
  };

  get plantGrowthLog(): string {
    return this.baseUri + this.endpoints.plant.plantGrowthLog;
  };

  getCropDataById(id: string): string {
    return (
      this.baseUri +
      this.endpoints.crop.getCropDataById.replace('{{cropId}}', id)
    );
  };

  get allCropData(): string {
    return this.baseUri + this.endpoints.crop.getAllCropData;
  };

  get cropPlantData(): string {
    return this.baseUri + this.endpoints.crop.getCropPlantData;
  };

  get cropNutrientBatchData(): string {
    return this.baseUri + this.endpoints.crop.getCropNutrientBatchData;
  };

  getNutrientBatchById(id: string): string {
    return (
      this.baseUri +
      this.endpoints.nutrientBatch.getNutrientBatchDataById.replace('{{nutrientBatchId}}', id)
    );
  };

  get allNutrientBatchData(): string {
    return this.baseUri + this.endpoints.nutrientBatch.getAllNutrientBatchData;
  };

  get createNutrientBatchApplication(): string {
    return this.baseUri + this.endpoints.nutrientBatch.createApplication;
  };

  get search(): string {
    return this.baseUri + this.endpoints.search.search;
  }

  get plantGrowthChartData(): string {
    return this.baseUri + this.endpoints.chartData.getPlantGrowthChartData;
  }

  get cropGrowthChartData(): string {
    return this.baseUri + this.endpoints.chartData.getCropGrowthChartData;
  }
};
