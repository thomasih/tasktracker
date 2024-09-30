import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { EventMenuComponent } from './event-menu/event-menu.component';

export const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'tasks', component: TaskComponent },
    { path: 'events', component: EventMenuComponent },
];