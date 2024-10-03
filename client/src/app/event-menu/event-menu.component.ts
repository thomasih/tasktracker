import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { AppEvent } from '../event-menu.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-event-menu',
  standalone: true,
  templateUrl: './event-menu.component.html',
  styleUrls: ['./event-menu.component.css'],
  imports: [FormsModule, CommonModule]
})
export class EventMenuComponent implements OnInit {
  events: AppEvent[] = [];
  newEvent: AppEvent = { id: 0, name: '', dueDate: '', userId: 0 };
  currentUserId: number = 0;

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.currentUserId = this.userService.getUserId();
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe((data: AppEvent[]) => {
      this.events = data.filter(event => event.userId === this.currentUserId);
      this.events.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    });
  }

  addEvent() {
    if (this.newEvent.name && this.newEvent.dueDate) {
      const newEvent = { ...this.newEvent, id: 0, userId: this.currentUserId };

      this.eventService.createEvent(newEvent).subscribe(() => { this.loadEvents(); });

      this.newEvent = { id: 0, name: '', dueDate: '', userId: 0 };
    }
  }

  removeEvent(index: number) {
    const eventId = this.events[index].id;
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.events.splice(index, 1);
    });
  }

  goToTasks(eventId: number) {
    this.router.navigate(['/tasks', eventId]);
  }
}