import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../types/Profile';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class UserService {




  user: Profile | undefined;

  constructor(private http: HttpClient) {

    const lstUser = localStorage.getItem('user') || undefined;

    if (lstUser) {
      this.user = JSON.parse(lstUser);
    }
  }

  isLogged() {
    return !!this.user;
  }

  login(email: string, password: string) {

    let headers = new HttpHeaders({
      'content-type': 'application/json'
    });

    const user = {
      email: email,
      password: password
    };
    //TODO: Validations 

    this.http.post(`${BASE_URL}/profile/auth`, user, { headers })
      .subscribe(data => console.log(data));
      

  }

  logout() {
    localStorage.removeItem('user');
  }

}
