import { IUser } from './User.interface';

export interface ISignInResponse {
  success: boolean
  userData?: IUser
  message: string
}