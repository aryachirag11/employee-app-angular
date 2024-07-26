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
  // User credentials : assuming the user is logged in already
  private userCredentials = new BehaviorSubject<UserCredentials | null>({
    email: 'aryachirag11@gmail.com',
    password: 'Chirag@2001',
  });
  get userCredentials$() {
    return this.userCredentials.asObservable();
  }

  // Additional information
  private additionalInfo = new BehaviorSubject<AdditionalInfo | null>(
    this.loadFromsessionStorage('additionalInfo') || null
  );
  get additionalInfo$() {
    return this.additionalInfo.asObservable();
  }

  // Employees data
  private employees = new BehaviorSubject<Employee[]>(
    this.loadFromsessionStorage('employees') || []
  );
  get employees$() {
    return this.employees.asObservable();
  }

  // Load data from sessionStorage
  private loadFromsessionStorage(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Save data to sessionStorage
  private saveTosessionStorage(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  // Methods to update data
  setAdditionalInfo(info: AdditionalInfo) {
    this.additionalInfo.next(info);
    this.saveTosessionStorage('additionalInfo', info);
  }

  setEmployees(employees: Employee[]) {
    this.employees.next(employees);
    this.saveTosessionStorage('employees', employees);
  }

  addEmployee(employee: Employee) {
    const currentEmployees = this.employees.value;
    const updatedEmployees = [...currentEmployees, employee];
    this.employees.next(updatedEmployees);
    this.saveTosessionStorage('employees', updatedEmployees);
  }

  clearEmployeeData() {
    this.employees.next([]);
    this.saveTosessionStorage('employees', []);
  }
}
