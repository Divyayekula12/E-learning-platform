import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FilterComponent } from '../filter/filter.component'; 

@Component({
  selector: 'app-course-list',
  standalone: true, 
  imports: [FormsModule, CommonModule, RouterModule, FilterComponent], 
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  
  courses: Course[] = []; // Stores the list of courses
  filteredCourses: Course[] = []; // Stores the filtered list of courses

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.filteredCourses = data; 
      },
      error: (error) => console.error('Error fetching courses:', error)
    });
  }

  filterCourses(searchText: string): void {
    if (!searchText) {
      this.filteredCourses = [...this.courses];
      return;
    }

    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.courses = this.courses.filter(course => course.id !== id);
        this.filteredCourses = this.filteredCourses.filter(course => course.id !== id);
      });
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  editCourse(id: number): void {
    this.router.navigate([`/edit-course/${id}`]);
  }
}
