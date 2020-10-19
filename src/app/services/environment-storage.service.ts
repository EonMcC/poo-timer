import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Environment {
  id: number;
  name: string;
  firstTimeDate: number;
  hourlyRate: number;
  currency: string;
  longestTime: number;
  shortestTime: number;
  totalTime: number;
}

const ENV_KEY = "environments"

@Injectable({
  providedIn: 'root'
})
export class EnvironmentStorageService {

  constructor(private storage: Storage) { }

  addEnvironment(environment: Environment): Promise<any> {
    return this.storage.get(ENV_KEY).then((environments: Environment[]) => {
      console.log('environments', environments)
      if (environments) {
        environments.push(environment);
        return this.storage.set(ENV_KEY, environments);
      } else {
        return this.storage.set(ENV_KEY, [environment]);
      }
    })
  }

  getEnvironments(): Promise<Environment[]> {
    return this.storage.get(ENV_KEY);
  }

  updateEnvironment(environment: Environment) {
    return this.storage.get(ENV_KEY).then((environments: Environment[]) => {
     if (!environments || HTMLIonItemSlidingElement.length === 0) {
       return null;
     }

     let newEnvironments: Environment[] = [];

     for (let p of environments) {
       if (p.id === environment.id) {
         newEnvironments.push(environment);
       } else {
         newEnvironments.push(p);
       }
     }
     return this.storage.set(ENV_KEY, newEnvironments);
    })
  }

  deleteEnvironment(id: number): Promise<Environment> {
    return this.storage.get(ENV_KEY).then((environments: Environment[]) => {
      if (!environments || environments.length === 0) {
        return null;
      }

      let toKeep: Environment[] = [];

      for (let p of environments) {
        if (p.id !== id) {
          toKeep.push(p);
        }
      }
      return this.storage.set(ENV_KEY, toKeep);
    })
  }

  clearEnvironments() {
    this.storage.clear()
  }
}
