import { GrowthStage } from './Plant.interface';
export interface IGrowthLog {
  _id: string;
  img: string;
  dateCreated: Date;
  numbersOfLeaves: number;
  heightInches: number;
  currentStage: GrowthStage;
}