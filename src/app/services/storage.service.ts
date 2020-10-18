import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Poo {
  id: number;
  createdAt: number;
  duration: number;
}

const POOS_KEY = 'my-poos'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {}

  addPoo(poo: Poo): Promise<any> {
    return this.storage.get(POOS_KEY).then((poos: Poo[]) => {
      console.log('poos', poos)
      if (poos) {
        poos.push(poo);
        return this.storage.set(POOS_KEY, poos);
      } else {
        return this.storage.set(POOS_KEY, [poo]);
      }
    })
  }

  getPoos(): Promise<Poo[]> {
    return this.storage.get(POOS_KEY);
  }

  updatePoo(poo: Poo) {
    return this.storage.get(POOS_KEY).then((poos: Poo[]) => {
     if (!poos || HTMLIonItemSlidingElement.length === 0) {
       return null;
     }

     let newPoos: Poo[] = [];

     for (let p of poos) {
       if (p.id === poo.id) {
         newPoos.push(poo);
       } else {
         newPoos.push(p);
       }
     }
     return this.storage.set(POOS_KEY, newPoos);
    })
  }

  deletePoo(id: number): Promise<Poo> {
    return this.storage.get(POOS_KEY).then((poos: Poo[]) => {
      if (!poos || poos.length === 0) {
        return null;
      }

      let toKeep: Poo[] = [];

      for (let p of poos) {
        if (p.id !== id) {
          toKeep.push(p);
        }
      }
      return this.storage.set(POOS_KEY, toKeep);
    })
  }

  clearPoos() {
    this.storage.clear()
  }
}
