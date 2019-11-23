import { Service } from 'typedi';

import Axios, { AxiosInstance } from 'axios';

@Service()
export class HttpClient {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = Axios.create({ 
      baseURL: 'http://localhost:3000', 
      headers: {
       'Content-Type': 'application/json',
      }});
  }

  get(endpoint: string, headers: any = {}, params: any = {}): any {
    return this.httpClient.get(endpoint, { params, headers });
  }

  post(endpoint: string, data: any, params: any = {}, headers: any = {}) {
    return this.httpClient.post(endpoint, data, { params, headers });
  }
}