import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {
  categoryList!: Observable<any>;

  constructor(private categoryService: CategoriesService, private router: Router) {}

  ngOnInit(): void {

    this.categoryList = this.categoryService.getCategories();
    // this.categoryList.forEach(data => {
    //   console.log(JSON.stringify(data));
    // })
    
  }

  navigateToCategory(categoryName: string, categoryId: string) {
    this.router.navigate(['/category', categoryName], { state: { 
      category: {
        categoryId: categoryId,
        categoryName: categoryName
      },
     }, });
  }

}
