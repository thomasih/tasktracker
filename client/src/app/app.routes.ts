import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { EventMenuComponent } from './event-menu/event-menu.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'events', component: EventMenuComponent },
    { path: 'tasks/:eventId', component: TaskComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];