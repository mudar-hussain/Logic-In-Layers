import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { first, map } from 'rxjs/operators';
import { Timestamp } from '@angular/fire/firestore';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-featured-section',
  templateUrl: './featured-section.component.html',
  styleUrls: ['./featured-section.component.css']
})
export class FeaturedSectionComponent implements OnInit {
  featuredPostList: Post[] = [];
  firstSlide: Post[] = [];
  remainingSlides: Post[][] = [];

  constructor(private postService: PostsService) {
    this.postService.getTopFeaturedPostsCrousel(6).subscribe(posts => {
      this.featuredPostList = posts;
      this.slicePostList(window.innerWidth);
      console.log("firstSlide:");
      console.log(this.firstSlide);
      console.log("remainingSlides:");
      console.log(this.remainingSlides);

    })
  }

  ngOnInit(): void {
    this.postService.getTopFeaturedPostsCrousel(6).subscribe(posts => {
      this.featuredPostList = posts;
      this.slicePostList(window.innerWidth);
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Update the post list slices when window is resized
    this.slicePostList(event.target.innerWidth);
  }

  slicePostList(screenWidth: number): void {
    const numPerSlide = screenWidth >= 992 ? 3 : 1; // Assuming 992px is the breakpoint for large screen
    this.firstSlide = [];
    this.firstSlide = this.featuredPostList.slice(0, numPerSlide);
    this.remainingSlides = [];
    const remainingPosts = this.featuredPostList.slice(numPerSlide);
    let slides: Post[] = [];
    for (let i = 0; i < remainingPosts.length; i += numPerSlide) {
      slides = remainingPosts.slice(i, i + numPerSlide);
      this.remainingSlides.push(slides);
    }
  }


}
