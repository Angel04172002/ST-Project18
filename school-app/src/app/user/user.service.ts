import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../types/Profile';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { HttpService } from '../@backend/services/http.service';
import { ProfileTypes } from '../@backend/enums/profile-types.enum';
import { MatCardLgImage } from '@angular/material/card';
import { Injectable } from '@angular/core';

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
      console.log(lstUser);
      this.user = JSON.parse(lstUser);
    }
  }

  isLogged() {
    return !!this.user;
  }




  async login(email: string, password: string) {

    const req = this.api.login(email, password);

    await firstValueFrom(req)
      .then((data) => {
        this.saveUser(data);
      })
      .catch(err => {
        throw err;
      });

  }


  async register(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, 
    type: string) {


  

    let profileType = ProfileTypes.Student;




    if (type == 'Parent') {
      profileType = ProfileTypes.Parent;
    } else if (type == 'Teacher') {
      profileType = ProfileTypes.Teacher
    } else if(type == 'Grade teacher') {
      profileType = ProfileTypes.GradeTeacher;
    }


    this.validateData(email, password, confirmPassword);

    const req = this.api.createProfile(firstName, lastName, email, password, confirmPassword, profileType);


    await firstValueFrom(req)
      .then((data) => {
        this.saveUser(data);
      })
      .catch(err => {
        throw err;
      });
  }


  getUser() {

    let user = localStorage.getItem('user');

    if (user) {
      return JSON.parse(user);
    }

    return undefined;
  }

  saveUser(data: any) {

    localStorage.clear();

    localStorage.setItem('user', JSON.stringify({
      id: data.id, firstName: data, lastName: data.lastName, email: data.email, type: data.type, token: data.token
    }));
  }


  validateData(email: string, password: string, confirmPassword: string): void {

    let err = {};

    if (!this.validateEmail(email)) {
      err = { error: 'Имейлът не е правилен' };
      throw err;
    };

    if (!this.validatePassword(password)) {
      err = { error: 'Паролата трябва да съдържа поне 10 символа, поне една малка буква, една главна буква, една цифра и един специален символ' };
      throw err;
    }

    if (password !== confirmPassword) {
      err = { error: 'Паролите не съвпадат' };
      throw err;
    }
  }


  validateEmail(email: any): boolean {
    return Boolean(emailPattern.exec(email));
  }

  validatePassword(password: any): boolean {
    return Boolean(passwordPattern.exec(password));
  }

  logout() {
    localStorage.removeItem('user');
  }
}



