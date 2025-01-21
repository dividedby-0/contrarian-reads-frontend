import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SnackbarService {
  private messageSource = new BehaviorSubject<string>('');
  currentMessage$: Observable<string> = this.messageSource.asObservable();

  showMessage(message: string): void {
    this.messageSource.next(message);
  }

  hideMessage(): void {
    this.messageSource.next('');
  }
}
