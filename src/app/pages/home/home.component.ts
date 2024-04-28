import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredPostList: Post[] = [];
  latestPostList: Post[] = [];

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.getTopFeaturedPosts(3).subscribe((postList) => {
      this.featuredPostList = postList;
    });
    this.postService.getTopPosts(10).subscribe((postList) => {
      this.latestPostList = postList
        .filter(
          (post) => !this.featuredPostList.some((fPost) => fPost.id === post.id)
        )
        .slice(0, 6);
    });
  }
}
