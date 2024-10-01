import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Event {
  id: number;
  name: string;
  dueDate: string;
  userId: number;
}

@Component({
  selector: 'app-event-menu',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './event-menu.component.html',
  styleUrls: ['./event-menu.component.css']
})
export class EventMenuComponent implements OnInit {
  events: Event[] = [];
  newEvent: Event = { id: 0, name: '', dueDate: '', userId: 0 };
  currentUserId: number = 101;

  constructor(private http: HttpClient, private router: Router) {}
  
  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<Event[]>('assets/data/events.json').subscribe((data) => {
      this.events = data;
      this.events.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    });
  }

  addEvent() {
    if (this.newEvent.name && this.newEvent.dueDate) {
      const newId = this.events.length > 0 ? Math.max(...this.events.map(e => e.id)) + 1 : 1;
      const eventToAdd = { ...this.newEvent, id: newId, userId: this.currentUserId };
      this.events.push(eventToAdd);
      this.events.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      this.newEvent = { id: 0, name: '', dueDate: '', userId: 0 };
    }
  }

  removeEvent(index: number) {
    this.events.splice(index, 1);
  }

  goToTasks(eventId: number) {
    this.router.navigate(['/tasks', eventId]);
  }
}
