import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../models/course.model';
import { CourseService } from '../course.service';
import { Location } from '@angular/common'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  imports: [FormsModule],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  course: Course = new Course();
  constructor(private router: Router, private courseService: CourseService, private location: Location) {}

  addCourse() {
    this.courseService.addCourse(this.course);
    alert('Course added successfully!');
    this.router.navigate(['/course-list']);
  }
  goBack(): void {
    this.location.back(); // Navigates to the previous page
  }
}

