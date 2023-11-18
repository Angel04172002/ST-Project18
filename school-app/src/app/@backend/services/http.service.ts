import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, empty, of } from "rxjs";
import { AddStudentToGrade } from "../models/add-student-to-grade.model";
import { ProfileTypes } from "../enums/profile-types.enum";
import { AddSubjectsToGrade } from "../models/add-subjects-to-grade.model";

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
    type: ProfileTypes,
    creatorId?: string
  ): Observable<any> {
    return this.post("/profile/create", {
      creator_id: creatorId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      type: type,
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
      return of({}); // empty observable so you don't get errors when subsribing to undefined
    }
    return this.post("/grades/add-to-grade", {
      students: students,
    });
  }

  public addSubjectsToGrade(subjects: AddSubjectsToGrade[]): Observable<any> {
    if (!subjects || subjects.length < 1) {
      console.error("Subjects not provided");
      return of({}); // empty observable so you don't get errors when subsribing to undefined
    }
    return this.post("/grades/add-subjects-to-grade", {
      subjects: subjects,
    });
  }
}
