import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class FetchAdapter implements HttpAdapter {
  constructor() {}
  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      const body = await response.json();
      return body;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something went wrong with the request');
    }
  }
  //  async get http<T>(request: RequestInfo): Promise<T> {

  // }
}
