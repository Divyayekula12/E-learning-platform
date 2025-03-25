import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Course } from '../models/course.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course: Course | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const courseId = Number(this.route.snapshot.paramMap.get('id')); // Convert ID to number
    const courses: Course[] = JSON.parse(localStorage.getItem('courses') || '[]'); 
    this.course = courses.find((c: Course) => c.id === courseId); 
  }
  goToCourses() {
    this.router.navigate(['/course-list']);
  }
 
}
