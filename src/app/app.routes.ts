import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { 
    path: 'register', 
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  { 
    path: 'login', 
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./courses/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
  { 
    path: 'add-course', 
    loadComponent: () => import('./courses/add-course/add-course.component').then(m => m.AddCourseComponent) 
  },
  { 
    path: 'courses', 
    loadComponent: () => import('./courses/course-list/course-list.component').then(m => m.CourseListComponent) 
  },
  { 
    path: 'course-list', 
    loadComponent: () => import('./courses/course-list/course-list.component').then(m => m.CourseListComponent) 
  },
  {
    path: 'edit-course/:id', 
    loadComponent: () => import('./courses/edit-course/edit-course.component').then(m => m.EditCourseComponent)
  }, 
  {
    path: 'course-details/:id', 
    loadComponent: () => import('./courses/course-details/course-details.component')
      .then(m => m.CourseDetailsComponent)
  },
  
  { path: '**', redirectTo: 'login' } 
  ];
