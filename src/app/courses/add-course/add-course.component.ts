import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { Location } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-course',
  imports: [FormsModule],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  course: Course = new Course(); // Object to store course details

  constructor(private router: Router, private courseService: CourseService,
  private location: Location, private http: HttpClient,private userService: UserService) {}

  addCourse(): void{
    this.courseService.addCourse(this.course).subscribe(() => {
      alert('Course added successfully!');
      this.router.navigate(['/course-list']);
    });
  }
  
  goBack(): void {
    this.location.back(); 
  }
}

