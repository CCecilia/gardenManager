import { INutrientBatchApplication } from './INutrientBatchApplication';

export interface INutrientBatch {
  _id: string;
  totalWaterGallons: number;
  dateCreated: Date;
  totalFloraMicroMls: number;
  totalFloraBloomMls: number;
  totalFloraGroMls: number;
  phDownMls: number;
  phUpMls: number;
  startingPh: number;
  endingPh: number;
  applications: INutrientBatchApplication,
  __v: number;

};
