import { Injectable } from '@angular/core';
import { stopData } from '../home/home.page';
import { Environment } from './environment-storage.service';
import { User } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  stopTime: string;
  stopTimeRaw: number;
  user: User;
  environment: Environment

  constructor() { }


}
