import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Keep Observable if you use it elsewhere

// Define the possible theme modes: only light or dark
export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private readonly initialMode: ThemeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
  private currentTheme: BehaviorSubject<ThemeMode> = new BehaviorSubject<ThemeMode>(this.initialMode);
  public theme$ = this.currentTheme.asObservable();

  private readonly storageKey = 'app-theme-mode';

  // FIX: Inject RendererFactory2 directly into the constructor.
  // The Angular DI system will handle providing the argument.
  constructor(rendererFactory: RendererFactory2) { 
    // FIX: Use the injected factory instance to create a Renderer2 instance.
    // The RendererFactory2 class does not have a static method 'createRenderer'
    this.renderer = rendererFactory.createRenderer(null, null); 
    this.initializeTheme();
  }
  
  // ... rest of the service methods remain the same ...

  private initializeTheme(): void {
    const storedTheme = localStorage.getItem(this.storageKey) as ThemeMode;

    if (storedTheme) {
      this.currentTheme.next(storedTheme);
    } 
    this.applyTheme(this.currentTheme.value);
  }

  public setTheme(mode: ThemeMode): void {
    this.currentTheme.next(mode);
    localStorage.setItem(this.storageKey, mode);
    this.applyTheme(mode);
  }

  private applyTheme(mode: ThemeMode): void {
    const htmlElement = document.documentElement;

    this.renderer.removeAttribute(htmlElement, 'data-bs-theme');

    if (mode === 'dark') {
      this.renderer.setAttribute(htmlElement, 'data-bs-theme', 'dark');
    } else {
      this.renderer.setAttribute(htmlElement, 'data-bs-theme', 'light');
    }
  }
}