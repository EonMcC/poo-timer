import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

export interface User {
  id: number;
	userName: string
	signupDate: number
	hourlyRate?: number
	currency?: string
}

const USER_KEY = 'users'

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor(private storage: Storage) { }

  addUser(user: User): Promise<any> {
    return this.storage.set(USER_KEY, user)
  }

  getUser(): Promise<User> {
    
    return this.storage.get(USER_KEY)
  }

  clearItems() {
    this.storage.clear()
  }
}
