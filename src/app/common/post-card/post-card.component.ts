import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { ConfigService } from 'src/app/services/config.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit{
  defaultPostImgPath: string = '#';
  @Input() postData!: Post;

  constructor(private router: Router, private postService: PostsService, private configService: ConfigService) {}

  ngOnInit(): void {
    this.defaultPostImgPath = this.configService.getDefaultPostImgURL("../../../");
  }
  
  navigateToPost() {
    this.router.navigate(['/post', this.postData.id + "-" + this.postData.title]);
  }
}
