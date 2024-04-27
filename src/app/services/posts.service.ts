import { Injectable } from '@angular/core';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  getFirestore,
  increment,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService{
  postInstance = collection(this.firestore, 'posts');

  constructor(private firestore: Firestore) {}

  getAllPosts(): Observable<Post[]> {
    const postsQuery = query(this.postInstance, orderBy('createdAt', 'desc'));
    return this.mapCollectionDataToPostList(
      collectionData(postsQuery, { idField: 'id' })
    );
  }

  getTopPosts(noOfPosts: number): Observable<Post[]> {
    const postsQuery = query(
      this.postInstance,
      orderBy('createdAt', 'desc'),
      limit(noOfPosts)
    );
    return this.mapCollectionDataToPostList(
      collectionData(postsQuery, { idField: 'id' })
    );
  }

  getAllFeaturedPosts() {
    const featuredPostsQuery = query(
      this.postInstance,
      where('isFeatured', '==', true),
      orderBy('createdAt', 'desc')
    );
    return collectionData(featuredPostsQuery, { idField: 'id' });
  }

  getTopFeaturedPosts(noOfPosts: number): Observable<Post[]> {
    const featuredPostsQuery = query(
      this.postInstance,
      where('isFeatured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(noOfPosts)
    );
    return this.mapCollectionDataToPostList(
      collectionData(featuredPostsQuery, { idField: 'id' })
    );
  }

  getTopFeaturedPostsCrousel(noOfPosts: number): Observable<Post[]> {
    const featuredPostsQuery = query(
      this.postInstance,
      where('isFeatured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(noOfPosts)
    );
    return this.mapCollectionDataToPostList(
      collectionData(featuredPostsQuery, { idField: 'id' })
    );
  }

  getPostById(id: string) {
    const docRef = doc(getFirestore(), 'posts', id);
    return getDoc(docRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          return this.mapToPost(docSnapshot.data());
        } else return null;
      })
      .catch((err) => {
        return null;
      })
      .finally(() => {
        return null;
      });
  }

  getAllPostsByCategory(categoryId: string): Observable<Post[]> {
    const categoryPostsQuery = query(
      this.postInstance,
      where('category.categoryId', '==', categoryId),
      orderBy('createdAt', 'desc')
    );
    return this.mapCollectionDataToPostList(
      collectionData(categoryPostsQuery, { idField: 'id' })
    );
  }

  getTopPostsByCategory(
    categoryId: string,
    noOfPosts: number
  ): Observable<Post[]> {
    const categoryPostsQuery = query(
      this.postInstance,
      where('category.categoryId', '==', categoryId),
      orderBy('createdAt', 'desc'),
      limit(noOfPosts)
    );
    return this.mapCollectionDataToPostList(
      collectionData(categoryPostsQuery, { idField: 'id' })
    );
  }

  countViews(postId: string) {
    const postInstance = doc(this.firestore, 'posts', postId);
    const viewsCount = {
      views: increment(1),
    };
    updateDoc(postInstance, viewsCount)
      .then(() => {
        console.log('count incremented by 1');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  mapCollectionDataToPostList(
    obsPostList: Observable<DocumentData[]>
  ): Observable<Post[]> {
    return obsPostList.pipe(
      map((posts: any[]) => {
        return posts.map((post) => this.mapToPost(post));
      })
    );
  }

  mapToPost(post: any): Post {
    return {
      title: post.title,
      permalink: post.permalink,
      category: {
        categoryId: post.category.categoryId,
        category: post.category.category,
      },
      postImgPath: post.postImgPath,
      excerpt: post.excerpt,
      content: post.content,
      isFeatured: post.isFeatured,
      views: post.views,
      status: post.status,
      createdAt: post.createdAt,
      id: post.id,
      newsletterUrl: post.newsletterUrl,
    } as Post;
  }
}
