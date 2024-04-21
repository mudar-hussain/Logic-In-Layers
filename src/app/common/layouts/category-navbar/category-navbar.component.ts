import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {
  categoryList!: Observable<any>;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {

    this.categoryList = this.categoryService.getCategories();

  }

}
