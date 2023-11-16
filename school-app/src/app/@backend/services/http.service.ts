import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddStudentToGrade } from "../models/add-student-to-grade.model";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private readonly url = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  private post(endpoint: string, body: any) {
    return this.httpClient.post(`${this.url}${endpoint}`, body);
  }

  /**
   * Тези методи връщат Observable, който ще извика заявката.
   * За да извиката този Observable трябва да изпълните асинхронен метод.
   * Вариант 1: firstValueFrom(yourObservable).then((data) => { console.log(data)... })
   * Можете да напишете await firstValueFrom... за да накарата javascript да изчака заявката
   * Вариант 2: yourObservable.subscribe()....
   * (аз предпомитам първото)...
   * в интърнет има много инфо, chatGPT също помага
   *  */

  // Profile methods

  public getProfile(id: string): Observable<any> {
    return this.post("/profile", {
      id: id,
    });
  }

  public createProfile(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    creatorId?: string
  ): Observable<any> {
    return this.post("/profile/create", {
      creator_id: creatorId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  }

  public login(email: string, password: string): Observable<any> {
    return this.post("/profile/auth", {
      email: email,
      password: password,
    });
  }

  // Grades methods

  public addStudentsToGrade(students: AddStudentToGrade[]): Observable<any> {
    if (!students || students.length < 1) {
      console.error("Students not provided");
      return;
    }
    return this.post("/grades/add-to-grade", {
      students: students,
    });
  }
}
