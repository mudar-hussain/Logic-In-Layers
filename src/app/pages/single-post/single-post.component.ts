import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit{
  defaultPostImgPath!: string;
  postData!: Post
  similarPostsList!: Observable<any>

  constructor(private router: Router, private postService: PostsService) {
    this.postData = this.router.getCurrentNavigation()?.extras.state?.['postData'];
    if (!this.postData) {
      this.router.navigate(['']);
    }
    this.loadSimilarPosts();
    this.postService.countViews(this.postData.id);
    console.log(this.postData);
  }

  ngOnInit(): void {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart){
          const extras = (event as NavigationStart).navigationTrigger === 'popstate' ? null : this.router.getCurrentNavigation()?.extras;
          this.postData = extras?.state?.['postData'] || null;
          if (!this.postData) {
            this.router.navigate(['']);
          }
          this.loadSimilarPosts();
          this.postService.countViews(this.postData.id);
          console.log(this.postData);
        }
      })
      this.defaultPostImgPath = this.postService.getDefaultPostImgURL("../../../");
  }

  loadSimilarPosts(){
    this.similarPostsList = this.postService.getTopPostsByCategory(this.postData.category.categoryId, 4);
  }

}
