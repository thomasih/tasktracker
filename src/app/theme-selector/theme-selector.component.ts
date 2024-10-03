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
    '#93E1D8',
    '#FFF5E1',
    '#AED9E0',
    '#CDB5A7'
  ];

  setTheme(color: string) {
    document.documentElement.style.setProperty('--theme-color', color);
  }
}
