import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  searchText: string = '';
  @Output() searchEvent = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.onSearch();
  }
  
  onSearch(): void {
    this.searchEvent.emit(this.searchText.trim());
  }
}
