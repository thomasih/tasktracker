import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  incompleteTasks = [
    { name: 'Task 1' },
    { name: 'Task 2' },
  ]

  completeTasks = [
    { name: 'Task A' },
    { name: 'Task B' },
  ]
}