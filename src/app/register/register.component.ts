import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { User } from "../models/user";
import { ToastrService } from "ngx-toastr";
import { DateFormatter } from '../utils/date.formatter';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  user = new User();
  repeatPass = "";
  loading = false;
  constructor(private apiUser: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  createUser() {
    if (this.check()) {
      if (this.repeatPass === this.user.password) {
        this.loading = true;
        this.user.username = this.user.email;
        this.user.date_joined = new DateFormatter().isoDateTime(new Date());
        this.user.is_active = true;
        const body = {
          user: this.user,
          roles: []
        }
        this.apiUser.post(body).subscribe(
          data => {
            this.toastr.success("Exito al crear cuenta", "Registro");
            this.loading = false;
          },
          error => {
            console.log(error);
            this.toastr.error("Error al crear cuenta", "Registro");
            this.loading = false;
          }
        );
      } else {
        this.toastr.error("Error, las contraseñas no coinciden", "Registro");
      }
    } else {
      this.toastr.error("Error, complete los campos", "Registro");
    }
  }

  check() {
    return (
      this.user.email !== "" &&
      this.user.first_name !== "" &&
      this.user.last_name !== "" &&
      this.user.password !== "" &&
      this.repeatPass !== ""
    );
  }

  clear() {
    this.user = new User();
    this.repeatPass = "";
  }
}
