import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.loadLoginState());

  constructor() {
    // Initialize the login state from localStorage or sessionStorage
    const storedLoginState = this.loadLoginState();
    this.loggedIn.next(storedLoginState);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login() {
    this.loggedIn.next(true);
    this.saveLoginState(true);
  }

  logout() {
    this.loggedIn.next(false);
    this.saveLoginState(false);
  }

  private loadLoginState(): boolean {
    const storedState = localStorage.getItem('loggedIn');
    return storedState ? JSON.parse(storedState) : false;
  }

  private saveLoginState(state: boolean): void {
    localStorage.setItem('loggedIn', JSON.stringify(state));
  }
}
