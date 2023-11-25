import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../types/Profile';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { HttpService } from '../@backend/services/http.service';
import { ProfileTypes } from '../@backend/enums/profile-types.enum';
import { MatCardLgImage } from '@angular/material/card';

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

  constructor(private http: HttpClient, private api: HttpService) {

    const lstUser = localStorage.getItem('user') || undefined;

    if (lstUser) {
      this.user = JSON.parse(lstUser);
    }
  }

  isLogged() {
    return !!this.user;
  }




  async login(email: string, password: string) {

   // const user = { email, password };

    const req = this.api.login(email, password);

    await firstValueFrom(req)
      .then((data) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch(err => {
        throw err;
      });

  }



  async register(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, type: string) {

    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      type: type
    };

    let profileType = ProfileTypes.Student;

    if (type == 'Parent') {
      profileType = ProfileTypes.Parent;
    };


    const req = this.api.createProfile(firstName, lastName, email, password, profileType);


    await firstValueFrom(req)
      .then((data) => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(err => {
        throw err;
      });
  }


  validateUser(user: any): boolean {
    return true && Boolean(passwordPattern.exec(user.password));
  }

  logout() {
    localStorage.removeItem('user');
  }
}



