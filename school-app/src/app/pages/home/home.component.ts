
import { firstValueFrom } from "rxjs";
import { Component } from "@angular/core";
import { HttpService } from "src/app/@backend/services/http.service";
import { UserService } from "src/app/user/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  constructor(private userService: UserService, private api: HttpService) { }


  isLoggedIn() {
    return this.userService.isLogged();
  }

  // public async test() {
  //   // const req = this.api.getProfile("57nbKl7gCaPuu4djXfk4EIifhN8ezxEkgkLFxSjI");

  //   // await firstValueFrom(req).then((data) => {
  //   //   console.log(data);
  //   // });

  //   const req = this.api.createProfile(
  //     "ime1",
  //     "posledno ime",
  //     "email234@gmail.com",
  //     "pas123",
  //     ProfileTypes.Student
  //   );
  //   await firstValueFrom(req).then((data) => {
  //     console.log(data);
  //   });
  // }
}
