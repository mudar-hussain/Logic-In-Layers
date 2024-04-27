import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
})
export class AllPostsComponent implements OnInit {
  filteredPostList: Post[] = [];
  allPostList: Post[] = [];
  searchText: string = "";

  @Input() featuredPostList: Post[] = [];
  @Input() latestPostList: Post[] = [];

  constructor(private postService: PostsService) {}
  ngOnInit(): void {
    this.allPostList.push(...this.featuredPostList);
    this.allPostList.push(...this.latestPostList);
    this.filteredPostList = this.allPostList;
    this.postService.getAllPosts().subscribe(posts => {
      this.allPostList = posts;
      this.search(this.searchText);
    })
  }

  search(searchText: string) {
    this.searchText = searchText;
    if(this.searchText.length == 0){
      this.filteredPostList = this.allPostList;
    }
    this.filteredPostList = this.allPostList.filter(post => post.category.category.includes(this.searchText) || post.title.includes(searchText) || post.content.includes(searchText))
  }

}
