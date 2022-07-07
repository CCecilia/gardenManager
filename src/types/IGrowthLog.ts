import { GrowthStage } from './Plant.interface';
export interface IGrowthLog {
  _id: string;
  img: {
    data: Buffer;
    contentType: string;
  };
  dateCreated: Date;
  numbersOfLeaves: number;
  heightInches: number;
  currentStage: GrowthStage;
}