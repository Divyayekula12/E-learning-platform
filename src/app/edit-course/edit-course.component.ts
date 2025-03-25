import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../models/course.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  imports: [FormsModule],
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})

export class EditCourseComponent implements OnInit {
  course: Course = new Course(); // Initializing with an instance of Course
  courses: Course[] = [];  // Array to store the list of courses

  constructor(private route: ActivatedRoute, private router: Router) {}

  // Lifecycle hook that runs when the component initializes
  ngOnInit() {
    this.loadCourses();
    const courseId = Number(this.route.snapshot.paramMap.get('id'));
  
    // Ensuring courses are loaded before finding the course
    setTimeout(() => {
      this.course = this.courses.find(c => c.id === courseId) || new Course();
    
      if (!this.course.id) {
        console.error("Course not found! Redirecting...");
        this.router.navigate(['/course-list']);
      }
    }, 0);
  }
  
  loadCourses() { // Method to load courses from local storage
    const storedCourses = localStorage.getItem('courses');
    this.courses = storedCourses ? JSON.parse(storedCourses).map((c: Course) => Object.assign(new Course(), c)) : [];
  }

  updateCourse() {
    const index = this.courses.findIndex(c => c.id === this.course.id);
    if (index !== -1) { // If the course exists, update its details
      this.courses[index] = this.course;
      localStorage.setItem('courses', JSON.stringify(this.courses));
      alert('Course updated successfully!');
      this.router.navigate(['/course-list']);
    }
  }

  cancel() {
    this.router.navigate(['/course-list']);
  }

  goToCourses() {
    this.router.navigate(['/course-list']);
  }
}
