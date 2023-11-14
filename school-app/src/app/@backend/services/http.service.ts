import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private readonly url = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  private post(endpoint: string, body: any) {
    return this.httpClient.post(`${this.url}${endpoint}`, body);
  }

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
}
