import { Injectable } from '@angular/core';
import { Environment } from './environment-storage.service';
import { User } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  startTime: number;
  stopTime: string;
  stopTimeRaw: number;
  user: User;
  environment: Environment

  constructor() { }

}
