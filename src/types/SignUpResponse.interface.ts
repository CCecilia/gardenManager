import { IUser } from './User.interface';

export interface ISignUpResponse {
  success: boolean
  userData?: IUser
  message: string
}