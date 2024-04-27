import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredPostList!: Post[];
  latestPostList!: Post[];

  constructor(private postService: PostsService){}

  ngOnInit(): void {
    this.postService.getTopFeaturedPosts(4).subscribe(postList => {
      this.featuredPostList = postList;
    })
    this.postService.getTopPosts(6).subscribe(postList => {
      this.latestPostList = postList;
    })
    
      
  }

}
