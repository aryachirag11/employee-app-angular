import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface UserCredentials {
  email: string;
  password: string;
}

interface AdditionalInfo {
  username: string;
  firstName: string;
  lastName: string;
  contactNumber: number;
  address: string;
  bio: string;
}

interface Employee {
  name: string;
  email: string;
  designation: string;
  age: number;
}

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  // User credentials
  private userCredentials = new BehaviorSubject<UserCredentials | null>({
    email: 'aryachirag11@gmail.com',
    password: 'aryachirag11@gmail.com',
  });
  get userCredentials$() {
    return this.userCredentials.asObservable();
  }

  // Additional information
  private additionalInfo = new BehaviorSubject<AdditionalInfo | null>(
    this.loadFromLocalStorage('additionalInfo') || null
  );
  get additionalInfo$() {
    return this.additionalInfo.asObservable();
  }

  // Employees data
  private employees = new BehaviorSubject<Employee[]>(
    this.loadFromLocalStorage('employees') || []
  );
  get employees$() {
    return this.employees.asObservable();
  }

  // Load data from localStorage
  private loadFromLocalStorage(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Save data to localStorage
  private saveToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Methods to update data
  setAdditionalInfo(info: AdditionalInfo) {
    this.additionalInfo.next(info);
    this.saveToLocalStorage('additionalInfo', info);
  }

  setEmployees(employees: Employee[]) {
    this.employees.next(employees);
    this.saveToLocalStorage('employees', employees);
  }

  addEmployee(employee: Employee) {
    const currentEmployees = this.employees.value;
    const updatedEmployees = [...currentEmployees, employee];
    this.employees.next(updatedEmployees);
    this.saveToLocalStorage('employees', updatedEmployees);
  }

  clearEmployeeData() {
    this.employees.next([]);
    this.saveToLocalStorage('employees', []);
  }
}
