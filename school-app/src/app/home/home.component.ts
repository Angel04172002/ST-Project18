import { Component } from "@angular/core";
import { HttpService } from "../@backend/services/http.service";
import { firstValueFrom } from "rxjs";
import { ProfileTypes } from "../@backend/enums/profile-types.enum";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  constructor(public api: HttpService) {}

  public async test() {
    // const req = this.api.getProfile("57nbKl7gCaPuu4djXfk4EIifhN8ezxEkgkLFxSjI");

    // await firstValueFrom(req).then((data) => {
    //   console.log(data);
    // });

    const req = this.api.createProfile(
      "ime1",
      "posledno ime",
      "email234@gmail.com",
      "pas123",
      ProfileTypes.Student
    );
    await firstValueFrom(req).then((data) => {
      console.log(data);
    });
  }
}
