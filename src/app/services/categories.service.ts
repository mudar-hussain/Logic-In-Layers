import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore: Firestore) { }

  getCategories(){
    const categoriesInstance = collection(this.firestore, 'categories');
    return collectionData(categoriesInstance, { idField : 'id' });
  }
}
