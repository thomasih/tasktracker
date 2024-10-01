import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.css'
})
export class ThemeSelectorComponent {
  colorThemes =
  [
    '#c6e2f9',
    '#f4d4c5',
    '#d5f4c4',
    '#f9e4c5',
    '#e8d7f9'
  ];

  setTheme(color: string) {
    document.documentElement.style.setProperty('--theme-color', color);
  }
}
