import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();

  login(email: string, password: string): void {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    this.loggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    this.loggedInSubject.next(false);
  }

  private isUserLoggedIn(): boolean {
    return localStorage.getItem('userEmail') !== null && localStorage.getItem('userPassword') !== null;
  }
}
