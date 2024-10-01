import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  description: string;
  priorityLevel: number;
  eventId: number;
  completed: boolean;
}

interface Event {
  id: number;
  name: string;
  dueDate: string;
  userId: number;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  incompleteTasks: Task[] = [];
  completeTasks: Task[] = [];
  eventName: string = '';
  allTasks: Task[] = [];
  eventId!: number;
  events: Event[] = [];
  
  newTaskDescription: string = '';
  newTaskPriority: number = 1;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    // subscribe to route parameters to retrieve event id
    this.route.paramMap.subscribe(params => {
      this.eventId = +params.get('eventId')!;

      if (this.eventId) {
        this.fetchTasks();
        this.fetchEventName();
      }
    });
  }

  fetchTasks() {
    this.http.get<Task[]>('assets/data/tasks.json').subscribe((data) => {
      this.allTasks = data;
      const eventTasks = this.allTasks.filter(task => task.eventId === this.eventId);
      eventTasks.sort((a, b) => a.priorityLevel - b.priorityLevel);
      this.incompleteTasks = eventTasks.filter(task => !task.completed);
      this.completeTasks = eventTasks.filter(task => task.completed);
    });
  }

  fetchEventName() {
    this.http.get<Event[]>('assets/data/events.json').subscribe((data) => {
      this.events = data;
      const currentEvent = this.events.find(event => event.id === this.eventId);

      this.eventName = currentEvent ? currentEvent.name : 'Event';
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
  }

  addTask() {
    if (this.newTaskDescription.trim() === '') {
      return;
    }

    const newTask: Task = {
      id: Math.max(...this.allTasks.map(t => t.id)) + 1,
      description: this.newTaskDescription,
      priorityLevel: this.newTaskPriority,
      eventId: this.eventId,
      completed: false
    };

    this.incompleteTasks.push(newTask);
    this.incompleteTasks.sort((a, b) => a.priorityLevel - b.priorityLevel);

    this.newTaskDescription = '';
    this.newTaskPriority = 1;
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