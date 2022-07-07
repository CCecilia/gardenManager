export type EndPoints = {
  user: {
    signUp: string;
    signIn: string;
  };
  plant: {
    getPlantDataById: string;
    getAllPlantData: string;
    plantGrowthLog: string;
  };
  crop: {
    getCropDataById: string;
    getAllCropData: string;
    getCropPlantData: string;
    getCropNutrientBatchData: string;
  };
  nutrientBatch: {
    getNutrientBatchDataById: string;
    getAllNutrientBatchData: string;
    createApplication: string;
  };
  search: {
    search: string;
  }
};
