import * as EndpointConfig from '../configs/endpoints.json';

import { EndPoints } from '../configs/endpoints';

// import env from "react-dotenv";

export default class EndpointService {
  // private baseUri: string = env.GARDEN_MANAGER_API;
  private baseUri: string = 'http://localhost:5000';
  private endpoints: EndPoints = EndpointConfig;

  get signUp(): string {
    return this.baseUri + this.endpoints.user.signUp;
  }

  get signIn(): string {
    return this.baseUri + this.endpoints.user.signIn;
  }
}
