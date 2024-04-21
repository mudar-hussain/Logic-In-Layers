import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, getFirestore, increment, limit, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  filePath = `${environment.defaultPostImgPath}`;

  constructor(private fireStorage: Storage, private firestore: Firestore) { }

  getDefaultPostImgURL() {
    const filePath = `${environment.defaultPostImgPath}`;
    const storageRef = ref(this.fireStorage, filePath);
    return getDownloadURL(storageRef);
  }

  getAllPosts(){
    const postInstance = collection(this.firestore, 'posts');
    const postsQuery = query(postInstance, orderBy('createdAt', 'desc'));
    return collectionData(postsQuery, { idField : 'id' });
  }

  getTopPosts(noOfPosts: number){
    const postInstance = collection(this.firestore, 'posts');
    const postsQuery = query(postInstance, orderBy('createdAt', 'desc'), limit(noOfPosts));
    return collectionData(postsQuery, { idField : 'id' });
  }

  getAllFeaturedPosts(){
    const postInstance = collection(this.firestore, 'posts');
    const featuredPostsQuery = query(postInstance, where('isFeatured', '==', true), orderBy('createdAt', 'desc'));
    return collectionData(featuredPostsQuery, { idField : 'id' });
  }

  getTopFeaturedPosts(noOfPosts: number){
    const postInstance = collection(this.firestore, 'posts');
    const featuredPostsQuery = query(postInstance, where('isFeatured', '==', true), orderBy('createdAt', 'desc'), limit(noOfPosts));
    return collectionData(featuredPostsQuery, { idField : 'id' });
  }

  getPostById(id: string){
    const docRef = doc(getFirestore(), "posts", id);
    return getDoc(docRef);
  }

  getAllPostsByCategory(categoryId: string){
    const postInstance = collection(this.firestore, 'posts');
    const categoryPostsQuery = query(postInstance, where('category.categoryId', '==', categoryId), orderBy('createdAt', 'desc'));
    return collectionData(categoryPostsQuery, { idField : 'id' });
  }

  getTopPostsByCategory(categoryId: string, noOfPosts: number){
    const postInstance = collection(this.firestore, 'posts');
    const categoryPostsQuery = query(postInstance, where('category.categoryId', '==', categoryId), orderBy('createdAt', 'desc'), limit(noOfPosts));
    return collectionData(categoryPostsQuery, { idField : 'id' });
  }

  countViews( postId: string) {
    const postInstance = doc(this.firestore, 'posts', postId);
    const viewsCount = {
      views: increment(1)
    }
    updateDoc(postInstance, viewsCount)
      .then(() => {
        console.log("count incremented by 1");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
