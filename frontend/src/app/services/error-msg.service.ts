import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorMsgService {
  private errorMessage = new BehaviorSubject<string>('');

  setError(message: string): void {
    this.errorMessage.next(message);
  }

  getError(): Observable<string> {
    return this.errorMessage.asObservable();
  }

  clearError() {
    this.errorMessage.next('');
  }
}
