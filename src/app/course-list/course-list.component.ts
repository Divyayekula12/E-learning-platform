import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from '../course.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-course-list',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = []; // Array to store the filtered list of courses based on search query
  searchQuery: string = ''; // Variable to hold the search input value

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {
     // Subscribe to the courseService observable to get the latest list of courses
    this.courseService.courses$.subscribe(courses => {
      this.courses = courses;
      this.filterCourses();  
    });
  }

  filterCourses() {
    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) // Convert to lowercase for case-insensitive search
    );
  }

  deleteCourse(courseId: number) { //deletes by course by ID
    this.courseService.deleteCourse(courseId);
  }

  editCourse(courseId: number) {
    this.router.navigate(['/edit-course', courseId]);
  }

  viewCourseDetails(courseId: number) {
    this.router.navigate(['/course-details', courseId]);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
