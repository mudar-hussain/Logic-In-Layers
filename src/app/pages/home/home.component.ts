import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredPostList!: Observable<any>;
  latestPostList!: Observable<any>;

  constructor(private postService: PostsService){}

  ngOnInit(): void {
    this.featuredPostList = this.postService.getTopFeaturedPosts(5);
    this.latestPostList = this.postService.getTopPosts(6);
      
  }

}
