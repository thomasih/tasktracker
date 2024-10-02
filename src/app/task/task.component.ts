import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { EventService } from '../event.service';
import { Task } from '../task.model';
import { AppEvent } from '../event-menu.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  incompleteTasks: Task[] = [];
  completeTasks: Task[] = [];
  eventName: string = '';
  allTasks: Task[] = [];
  eventId!: number;
  
  newTaskDescription: string = '';
  newTaskPriority: number = 1;

  constructor(private route: ActivatedRoute, private taskService: TaskService, private eventService: EventService) {} // Inject EventService

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.eventId = +params.get('eventId')!;

      if (this.eventId) {
        this.loadTasks();
        this.fetchEventName();
      }
    });
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      const eventTasks = data.filter(task => task.eventId === this.eventId);
      eventTasks.sort((a, b) => a.priorityLevel - b.priorityLevel);
      this.incompleteTasks = eventTasks.filter(task => !task.completed);
      this.completeTasks = eventTasks.filter(task => task.completed);
    });
  }

  fetchEventName() {
    this.eventService.getEvents().subscribe((events: AppEvent[]) => {
      const event = events.find(e => e.id === this.eventId);
      if (event) { this.eventName = event.name; } 
    });
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;

    if (task.completed) {
      this.incompleteTasks = this.incompleteTasks.filter(t => t.id !== task.id);
      this.completeTasks.push(task);
    } else {
      this.completeTasks = this.completeTasks.filter(t => t.id !== task.id);
      this.incompleteTasks.push(task);
    }

    this.incompleteTasks.sort((a, b) => a.priorityLevel - b.priorityLevel);
    this.completeTasks.sort((a, b) => a.priorityLevel - b.priorityLevel);

    this.updateTaskCompletion(task);
  }

  updateTaskCompletion(task: Task) { this.taskService.updateTask(task).subscribe(); }  

  addTask() {
    if (this.newTaskDescription.trim() === '') {
      return;
    }

    const newTask: Task = {
      id: 0,
      description: this.newTaskDescription,
      priorityLevel: this.newTaskPriority,
      eventId: this.eventId,
      completed: false
    };

    this.taskService.addTask(newTask).subscribe(() => { this.loadTasks(); });

    this.newTaskDescription = '';
    this.newTaskPriority = 1;
  }

  removeTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.completeTasks = this.completeTasks.filter(task => task.id !== taskId);
    });
  }

  getPriorityColor(priorityLevel: number): string {
    switch (priorityLevel) {
      case 1:
        return '#f9c6c9';
      case 2:
        return '#f6e8b8';
      case 3:
        return '#c9f9c6';
      default:
        return 'transparent';
    }
  }
}