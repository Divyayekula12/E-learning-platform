import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Get all courses
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl)
      .pipe(
        tap(data => console.log('All courses fetched', data)),
      );
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }


  addCourse(course: Course): Observable<Course> {
    return this.getCourses().pipe(
      tap((courses) => {
        const maxId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) : 0;
        course.id = maxId + 1; 
      }),
      switchMap(() => {
        return this.http.post<Course>(this.apiUrl, course, this.httpOptions).pipe(
          tap((newCourse: Course) => console.log(`Added course with id=${newCourse.id}`)),

        );
      })
    );
  }
  
  // Update an existing course
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course);
  }

  // Delete a course
  deleteCourse(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => console.log(`Deleted course with id=${id}`)),
    );
  }
  
}





