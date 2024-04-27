import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  private searchTerms = new Subject<string>();
  @Output() searchEmitter = new EventEmitter<string>();

  constructor() {
    this.searchTerms.pipe(
      debounceTime(300), // Debounce for 300 milliseconds
      distinctUntilChanged() // Only emit if the value has changed
    ).subscribe((searchTerm: string) => {
      // Call your search function here with the search term
      this.search(searchTerm);
    });
  }
  
  search(searchText: string): void {
    console.log('Searching for:', searchText);
    this.searchEmitter.emit(searchText);
  }

  onKeyUp(event: KeyboardEvent): void {
    this.searchTerms.next((event.target as HTMLInputElement).value);
  }
}
