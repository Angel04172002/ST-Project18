import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { HttpService } from "src/app/@backend/services/http.service";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  standalone: true,
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private httpService: HttpService
  ) {}

  login(e: Event, email: string, password: string): void {
    e.preventDefault();

    this.userService
      .login(email, password)
      .then(() => {
        setTimeout(() => {
          location.reload();
        }, 10);

        this.router.navigate(["/home"]);
      })
      .catch((err) => {
        console.error(err);
        alert(err.error);
      });
  }

  logout() {
    this.userService.logout();
  }

  async test() {
    this.httpService.jwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMXRpclZ3U2ZqNkNJVFdxcXIwUk5KbWo2WWxYMGdBbEFrZk1OQTFFMSIsImVtYWlsIjoidGVzdC5zdHVkZW50NTVAZ21haWwuY29tIiwiaWF0IjoxNzA0NTM3MDMwLCJleHAiOjE3MDQ1NDQyMzB9.JuTwAvRm25bPARQQ5s3GNb7mGjly3QiVfE0p3D9gcT0";
    const req = this.httpService.getProfile(
      "57nbKl7gCaPuu4djXfk4EIifhN8ezxEkgkLFxSjI"
    );
    await firstValueFrom(req)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
