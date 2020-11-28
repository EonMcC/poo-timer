import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
  id: number;
  environmentID: number;
  createdAt: number;
  duration: number;
  worth: number;
  isLongest: boolean;
  isShortest: boolean;
  formattedDuration?: string;
}

const ITEMS_KEY = 'items'

@Injectable({
  providedIn: 'root'
})
export class ItemStorageService {

  constructor(private storage: Storage) {}

  addItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    })
  }

  getItems(): Promise<Item[]> {
    return this.storage.get(ITEMS_KEY);
  }

  updateItem(item: Item) {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
     if (!items) {
       return null;
     }

     let newItems: Item[] = [];

     for (let p of items) {
       if (p.id === item.id) {
         newItems.push(item);
       } else {
         newItems.push(p);
       }
     }
     return this.storage.set(ITEMS_KEY, newItems);
    })
  }

  deleteItem(id: number): Promise<Item[]> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: Item[] = [];

      for (let p of items) {
        if (p.id !== id) {
          toKeep.push(p);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    })
  }

  deleteEnvironmentItems(environmentID: number) {
    this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      
      let toKeep: Item[] = [];

      for (let i of items) {
        if (i.environmentID !== environmentID) {
          toKeep.push(i)
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    })
  }

  clearItems() {
    this.storage.clear()
  }
}
