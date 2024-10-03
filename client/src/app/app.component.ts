import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './task/task.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { EventMenuComponent } from './event-menu/event-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoginComponent, TaskComponent, ThemeSelectorComponent, EventMenuComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tasktracker';
}