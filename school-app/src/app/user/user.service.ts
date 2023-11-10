import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User | undefined;

  constructor() {

    const lstUser = localStorage.getItem('user') || undefined;

    if (lstUser) {
      this.user = JSON.parse(lstUser);
    }
  }

  isLoggedIn() {
    return !!this.user;
  }

  login(email: string, password: string): void {

    //TODO: Validations 

    const userToBeLoggedIn: User = { 
      id: 'aaa-bbb-ccc',
      firstName: 'Peter',
      lastName: 'Ivanov',
      email: email,
      password: password
    };

    localStorage.setItem('user', JSON.stringify(userToBeLoggedIn));

  }

  logout() {
    localStorage.removeItem('user');
  }

}
