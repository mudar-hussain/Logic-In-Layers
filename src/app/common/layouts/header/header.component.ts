import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  newsletterUrl: string = "#";
  isWindow: boolean = window.innerWidth < 770;

  constructor(private postService: PostsService){}
  
  ngOnInit(): void {
    this.newsletterUrl = this.postService.getNewsletterURL();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isWindow = event.target.innerWidth < 770 ? true : false;
  }
}
