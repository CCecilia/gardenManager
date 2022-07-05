export type EndPoints = {
  user: {
    signUp: string;
    signIn: string;
  };
  plant: {
    getPlantDataById: string;
    getAllPlantData: string;
  };
  crop: {
    getCropDataById: string;
    getAllCropData: string;
    getCropPlantData: string;
  };
  nutrientBatch: {
    getNutrientBatchDataById: string;
    getAllNutrientBatchData: string;
  };
};
