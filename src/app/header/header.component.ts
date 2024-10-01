import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentRoute: string = "/tasks";

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute = this.router.url;
      });
  }

  public toggleComponent() {
    if (this.currentRoute !== '/events') {
      this.router.navigate(['/events']);
    }
  }

  public loginPressed() {
    this.router.navigate(['/login']);
  }
}
