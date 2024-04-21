import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit{

  @Input() postData!: Post;

  constructor(private router: Router) {}

  ngOnInit(): void {
      console.log(this.postData);
  }
  
  navigateToPost() {
    this.router.navigate(['/post', this.postData.title], { state: { 
      postData: this.postData,
     }, });
  }


}
