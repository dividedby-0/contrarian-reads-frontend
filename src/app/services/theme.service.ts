import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ThemeService {
  private isDarkModeSubject: BehaviorSubject<boolean>;
  isDarkMode$;

  constructor() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored === 'dark' || (!stored && prefersDark);
    this.isDarkModeSubject = new BehaviorSubject<boolean>(isDark);
    this.isDarkMode$ = this.isDarkModeSubject.asObservable();
    this.applyTheme(isDark);
  }

  toggleTheme(): void {
    const newValue = !this.isDarkModeSubject.value;
    this.isDarkModeSubject.next(newValue);
    this.applyTheme(newValue);
  }

  private applyTheme(isDark: boolean): void {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
