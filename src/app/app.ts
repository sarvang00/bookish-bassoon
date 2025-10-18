import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService, ThemeMode } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('bookish-bassoon');
  
  constructor(private appThemeService: ThemeService) {}

  onThemeChange(newMode: ThemeMode): void {
    this.appThemeService.setTheme(newMode);
  }
}
