import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { EventMenuComponent } from './event-menu/event-menu.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'tasks/:eventId', component: TaskComponent },
    { path: 'events', component: EventMenuComponent },
    { path: 'login', component: LoginComponent }
];