import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SnackbarService {
  private messageSource = new BehaviorSubject<string>('');
  currentMessage$: Observable<string> = this.messageSource.asObservable();

  showMessage(message: string, duration: number = 3000): void {
    this.messageSource.next(message);
    setTimeout(() => {
      this.hideMessage();
    }, duration);
  }

  hideMessage(): void {
    this.messageSource.next('');
  }
}
