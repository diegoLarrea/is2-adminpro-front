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
  loading: boolean = false;
  err = {
    m: "",
    e: false
  };
  constructor(private api: AuthenticationService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.loading = true;
    this.err.m = "";
    this.err.e = false;
    this.api.login(this.u, this.p).subscribe(
      data => {
        this.api.saveData(data.currentUser, data.firebase);
        this.router.navigate([""]);
      },
      error => {
        this.loading = false;
        if (error.error.error) {
          this.err.m = error.error.mensaje;
        } else {
          this.err.m = "Usuario y/o contraseña inválido";
        }

        this.err.e = true;
      }
    );
  }
}
