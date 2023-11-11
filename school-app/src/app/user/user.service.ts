import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../types/Profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: Profile | undefined;

  constructor() {

    const lstUser = localStorage.getItem('user') || undefined;

    if (lstUser) {
      this.user = JSON.parse(lstUser);
    }
  }

  isLogged() {
    return !!this.user;
  }

  login(email: string, password: string) {

    //TODO: Validations 

    const userToBeLoggedIn: Profile = { 
      id: 87,
      creatorId: 1,
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
