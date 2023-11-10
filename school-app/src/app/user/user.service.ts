import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any | undefined;

  constructor(private http: HttpClient) {

    const lstUser = localStorage.getItem('user');
    this.user = lstUser;

  }

  isLoggedIn() {
    return !!this.user;
  }

  login(username: string, password: string): void {

    const userToBeLoggedIn : any = { username: username, password: password };
    localStorage.setItem('user', userToBeLoggedIn);

  }

  logout() {
    localStorage.removeItem('user');
  }

}
