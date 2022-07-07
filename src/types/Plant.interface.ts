import { IGrowthLog } from './IGrowthLog';

export interface GrowthStage {
  name: string;
  cycleNumber: number;
  _id: string;
}

export interface IPlant {
  _id: string;
  germinationDate: Date;
  dateCreated: Date;
  location: {
    area: string;
    column: number;
    row: number;
  };
  stages: GrowthStage[];
  currentStage: GrowthStage;
  hoursOfLight: number;
  notes: string[];
  harvested: boolean;
  commonName: string;
  genus: string;
  species: string;
  variety: string;
  numberOfLumensExposure: number;
  dailyWaterUsage: number;
  growthLogs: IGrowthLog[];
  __v: number;
}
