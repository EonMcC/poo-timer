import { Injectable } from '@angular/core';
import { stopData } from './home.page';

export interface User {
  id: string;
	email?: string;
	name?: string;
	signupDate?: number;
	firstPooDate?: number;
	hourlyRate?: number;
	currency?: string;
	longestPooTime?: number;
	shortestPooTime?: number;
	numberOfPoos?: number;
	totalPooTime?: number;
	lastPooDate?: number;
	pooStreak?: number,
	firstLogin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  stopTime: string;
  stopTimeRaw: number;
  user: User;

  constructor() { }


}
