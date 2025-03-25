import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from './models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = JSON.parse(localStorage.getItem('courses') || '[]');
  
  // BehaviorSubject to manage course updates
  private coursesSubject = new BehaviorSubject<Course[]>(this.courses);
  courses$ = this.coursesSubject.asObservable();

  constructor() {}

  // Get all courses
  getCourses(): Course[] {
    return this.courses;
  }

  // Add a new course
  addCourse(course: Course) {
    course.id = new Date().getTime(); // creates Unique ID
    this.courses.push(course);
    this.updateLocalStorage();
  }

  // Update an existing course
  updateCourse(updatedCourse: Course) {
    const index = this.courses.findIndex(course => course.id === updatedCourse.id);
    if (index !== -1) {
      this.courses[index] = updatedCourse;
      this.updateLocalStorage();
    }
  }

  // Delete a course
  deleteCourse(courseId: number) {
    this.courses = this.courses.filter(course => course.id !== courseId);
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('courses', JSON.stringify(this.courses));
    this.coursesSubject.next(this.courses); // Notifies components about updates
  }
}
