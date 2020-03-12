import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  u: string = "";
  p: string = "";
  constructor(private api: AuthenticationService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.api.login(this.u, this.p).subscribe(
      data => {
        this.api.saveData(data.currentUser, data.token);
        this.router.navigate(["dashboard"]);
      },
      error => {
        console.log(error.error);
      }
    );
  }
}
