import { Injectable } from '@angular/core';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  limit,
  query,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categoriesInstance = collection(this.firestore, 'categories');
  constructor(private firestore: Firestore) {}

  getTopCategories(noOfCategories: number): Observable<Category[]> {
    const categoriesQuery = query(
      this.categoriesInstance,
      limit(noOfCategories)
    );
    return this.mapCollectionDataToCategoryList(
      collectionData(categoriesQuery, { idField: 'id' })
    );
  }

  mapCollectionDataToCategoryList(
    obsCatList: Observable<DocumentData[]>
  ): Observable<Category[]> {
    return obsCatList.pipe(
      map((categories: any[]) => {
        console.log(categories);
        return categories.map((category) => this.mapToCategory(category));
      })
    );
  }

  mapToCategory(category: any): Category {
    return {
      categoryId: category.id,
      category: category.category,
    } as Category;
  }
}
