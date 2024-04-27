import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent implements OnInit {
  category: Category = {
    category: '',
    categoryId: '',
  };
  categoryPostList!: Post[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category.category = params['categoryName'];
      this.category.categoryId = params['categoryId'];
      this.postService
        .getAllPostsByCategory(this.category.categoryId)
        .subscribe((postList) => {
          this.categoryPostList = postList;
        });
    });
  }
}
