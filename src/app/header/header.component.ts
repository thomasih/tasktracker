import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeSelectorComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentRoute: string = "/tasks";

  constructor(private router: Router, private userService: UserService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute = this.router.url;
      });
  }

  public toggleComponent() {
    if (this.currentRoute !== '/events' && this.userService.getUserId() !== 0) {
      this.router.navigate(['/events']);
    }
  }

  public logoutPressed() {
    this.userService.setUserId(0);
    this.router.navigate(['/login']);
  }
}