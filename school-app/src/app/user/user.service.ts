import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../types/Profile';
import { Observable } from 'rxjs';
import { HttpService } from '../@backend/services/http.service';

const BASE_URL = 'http://localhost:3000';
const emailPattern = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
const passwordPattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,}$');

@Injectable({
  providedIn: 'root'
})
export class UserService {


  headers = new HttpHeaders({
    'content-type': 'application/json'
  });



  user: Profile | undefined;

  constructor(private http: HttpClient, private httpService : HttpService) {

    const lstUser = localStorage.getItem('user') || undefined;

    if (lstUser) {
      this.user = JSON.parse(lstUser);
    }
  }

  isLogged() {
    return !!this.user;
  }

  login(email: string, password: string) {


    const user = {
      email: email,
      password: password
    };

    localStorage.setItem('user', JSON.stringify(user));



    this.http.post(`${BASE_URL}/profile/auth`, user, { headers: this.headers })
      .subscribe(data => console.log(data))


  }



  register(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, type: string) {



    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      type: type
    };

    localStorage.setItem('user', JSON.stringify(user));

   this.httpService.createProfile(firstName, lastName, email, password)
    .subscribe(data => console.log(data));

  }


  validateUser(user: any): boolean {
    return true && Boolean(passwordPattern.exec(user.password));
  }

  logout() {
    localStorage.removeItem('user');
  }
}



