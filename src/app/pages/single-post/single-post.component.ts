import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit{

  postData!: Post

  constructor(private router: Router) {
    this.postData = this.router.getCurrentNavigation()?.extras.state?.['postData'];
    if (!this.postData) {
      this.router.navigate(['']);
    }
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
          console.log(this.postData);
        }
      })
  }

}
