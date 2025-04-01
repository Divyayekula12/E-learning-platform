import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course: Course | undefined; // Holds the course details

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id')); 

      if (!isNaN(courseId)) {  // Fetch course details using the CourseService
        this.courseService.getCourse(courseId).subscribe({
          next: (data) => this.course = data,
          error: (error) => {
            console.error('Course not found:', error);
            this.router.navigate(['/course-list']);
          }
        });
      } else {
        console.error('Invalid course ID');
        this.router.navigate(['/course-list']);
      }
  }
  goToCourses(): void {
    this.router.navigate(['/course-list']);
}
}
