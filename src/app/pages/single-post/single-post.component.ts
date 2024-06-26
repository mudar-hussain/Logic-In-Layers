import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { ConfigService } from 'src/app/services/config.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  defaultPostImgPath: string = '#';
  newsletterUrl: string = '#';
  postData!: Post;
  similarPostsList: Post[] = [];
  postId = '';

  constructor(
    private router: Router,
    private postService: PostsService,
    private configService: ConfigService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const postIdTitle = params['postIdTitle'];
      let index: number = postIdTitle.indexOf('-');
      this.postId = postIdTitle.substring(0, index);
      this.postService.getPostById(this.postId).then((post) => {
        if (post == null) {
          this.router.navigate(['/']);
        } else {
          this.postData = post;
          this.postData.id = this.postId;
          this.postService.countViews(this.postId);
          this.loadSimilarPosts();
        }
      });
    });
    
    this.newsletterUrl = this.configService.getNewsletterURL();
    this.defaultPostImgPath =
      this.configService.getDefaultPostImgURL('../../../');
  }

  loadSimilarPosts() {
    this.postService
      .getTopPostsByCategory(this.postData.category.categoryId, 3)
      .subscribe((postList) => {
        this.similarPostsList = postList.filter(
          (post) => post.id != this.postData.id
        );
      });
  }

  navigateToCategory(categoryName: string, categoryId: string) {
    this.router.navigate(['/category', categoryName, categoryId ]);
  }
}
