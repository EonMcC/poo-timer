import { Injectable } from '@angular/core';
import { stopData } from './home.page';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  stopTime: string;
  stopTimeRaw: number;
  user: {
    id: string;
    email: string;
    signupDate: number;
    name?: string;
    hourlyRate?: number;
    currency?: string;
    totalPooTime?: number;
  }

  constructor() { }


}
