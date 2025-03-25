import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseListComponent } from './course-list/course-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },  // Default route
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'add-course', component: AddCourseComponent },  // Ensure this route exists
    { path: 'courses', component: CourseListComponent } ,
    { path: 'edit-course/:id', component: EditCourseComponent },
    {path: 'course-list', component: CourseListComponent},
    { path: 'course-details/:id', component: CourseDetailsComponent },
    { path: '**', redirectTo: 'register' }  // Redirect unknown routes
];
