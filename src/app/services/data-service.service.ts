import { Injectable } from '@angular/core';
import { stopData } from '../home/home.page';
import { User } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  stopTime: string;
  stopTimeRaw: number;
  user: User;

  constructor() { }


}
