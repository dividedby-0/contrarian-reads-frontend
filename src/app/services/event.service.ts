import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private refreshMainPageSubject = new Subject<void>();
  refreshMainPage$ = this.refreshMainPageSubject.asObservable();

  refreshMainPage() {
    this.refreshMainPageSubject.next();
  }
}
