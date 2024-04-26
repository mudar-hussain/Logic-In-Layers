import { Injectable } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore: Firestore) { }

  getCategories(): Observable<Category[]>{
    const categoriesInstance = collection(this.firestore, 'categories');
    return collectionData(categoriesInstance, { idField : 'id' }).pipe(
      map((categories: any[]) => {
        console.log(categories);
        return categories.map(category => ({
          categoryId: category.id,
          category: category.category
        } as Category))
      })
    );
  }
}
