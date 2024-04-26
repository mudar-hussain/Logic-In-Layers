import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css'],
})
export class CategoryNavbarComponent implements OnInit {
  categoryList: Category[] = [];

  constructor(
    private categoryService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categoryList = categories;
    });
  }

  navigateToCategory(categoryName: string, categoryId: string) {
    this.router.navigate(['/category', categoryName, categoryId]);
  }
}
