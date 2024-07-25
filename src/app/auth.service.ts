//Service to handle the login state of the user

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //to keep tack of the login state
  private loggedIn = new BehaviorSubject<boolean>(this.loadLoginState());

  constructor() {
    //initialize the login state from local storage
    // Initialize the login state from localStorage or sessionStorage
    const storedLoginState = this.loadLoginState();
    this.loggedIn.next(storedLoginState);
  }
  // observabel for othe components to subcripe to the login state
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  // set login state : isLoggedIn -> true, save it to local storage
  login() {
    this.loggedIn.next(true);
    this.saveLoginState(true);
  }
  // set login state : isLoggedIn -> false, save it to local storage

  logout() {
    this.loggedIn.next(false);
    this.saveLoginState(false);
  }
  //laod login state from local storage
  private loadLoginState(): boolean {
    const storedState = localStorage.getItem('loggedIn');
    return storedState ? JSON.parse(storedState) : false;
  }
  //save login state in local storage
  private saveLoginState(state: boolean): void {
    localStorage.setItem('loggedIn', JSON.stringify(state));
  }
}
