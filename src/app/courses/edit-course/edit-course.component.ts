import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  course: Course | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const courseId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(courseId)) {
      console.error('Invalid course ID');
      this.router.navigate(['/course-list']);
      return;
    }

    this.courseService.getCourse(courseId).subscribe({  // Fetch the course details from the CourseService
      next: (data) => {
        this.course = data;  // Assign the fetched course data
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Course not found:', error);
        this.router.navigate(['/course-list']);
      }
    });
  }

  updateCourse(): void {
    if (!this.course) return;
    this.courseService.updateCourse(this.course).subscribe(() => {
      alert('Course updated successfully!');
      this.router.navigate(['/course-list']);
    });
  }

  cancel(): void {
    this.router.navigate(['/course-list']);
  }
}
