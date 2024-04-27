import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  newsletterUrl: string = "#";
  linkedinProfileUrl: string = "#";
  githubProfileUrl: string = "#";
  isWindow: boolean = window.innerWidth < 770;

  constructor(private configService: ConfigService){}
  
  ngOnInit(): void {
    this.newsletterUrl = this.configService.getNewsletterURL();
    this.linkedinProfileUrl = this.configService.getLinkedinProfileURL();
    this.githubProfileUrl = this.configService.getGithubProfileUrl();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isWindow = event.target.innerWidth < 770 ? true : false;
  }
}
