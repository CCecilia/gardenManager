export interface GrowthStage {
  name: string;
  cycleNumber: number;
  _id: string;
}

export interface IPlant {
  _id: string;
  dateCreated: Date;
  growth: number[];
  height: number;
  currentStage: GrowthStage;
  numberOfLeaves: number;
  hoursOfLight: number;
  numberOfLumensExposure: number;
  notes: [];
  harvested: boolean;
  commonName: string;
  genus: string;
  species: string;
  stages: GrowthStage[];
  __v: number;
}
