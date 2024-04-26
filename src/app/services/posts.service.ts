import { Injectable } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData, doc, getDoc, getFirestore, increment, limit, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private firestore: Firestore) {}

  getDefaultPostImgURL(pathPrefix: string) {
    return pathPrefix + "assets/img/post-placeholder-image.png"
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

  getTopFeaturedPostsCrousel(noOfPosts: number): Observable<Post[]>{
    const postInstance = collection(this.firestore, 'posts');
    const featuredPostsQuery = query(postInstance, where('isFeatured', '==', true), orderBy('createdAt', 'desc'), limit(noOfPosts));
    return this.mapCollectionDataToPostList(collectionData(featuredPostsQuery, { idField : 'id' }));
  }

  getPostById(id: string){
    const docRef = doc(getFirestore(), "posts", id);
    return getDoc(docRef);
  }

  getAllPostsByCategory(categoryId: string): Observable<Post[]>{
    const postInstance = collection(this.firestore, 'posts');
    const categoryPostsQuery = query(postInstance, where('category.categoryId', '==', categoryId), orderBy('createdAt', 'desc'));
    return this.mapCollectionDataToPostList(collectionData(categoryPostsQuery, { idField : 'id' }));
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

  mapCollectionDataToPostList(obsPostList: Observable<DocumentData[]>): Observable<Post[]>{
    return obsPostList.pipe(
      map((posts: any[]) => {
        return posts.map(post => (this.mapToPost(post)))
      })
    );
  }

  mapToPost(post: any): Post {
    return {
      title: post.title,
      permalink: post.permalink,
      category: {
          categoryId: post.category.categoryId,
          category: post.category.category
      },
      postImgPath: post.postImgPath,
      excerpt: post.excerpt,
      content: post.content,
      isFeatured: post.isFeatured,
      views: post.views,
      status: post.status,
      createdAt: post.createdAt,
      id: post.id
    } as Post
  }
}
