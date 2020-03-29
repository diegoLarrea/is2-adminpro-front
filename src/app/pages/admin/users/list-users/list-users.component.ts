import { Component, OnInit } from "@angular/core";
import { User } from "../../../../models/user";
import { UserService } from "../../../../services/user.service";
import { RolService } from "../../../../services/rol.service";
import { ToastrService } from "ngx-toastr";
import { DateFormatter } from "../../../../utils/date.formatter";

declare var $: any;
@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.css"]
})
export class ListUsersComponent implements OnInit {
  //Variables de pantalla principal
  users: User[] = [];
  loading = true;
  roles = [];

  //Variables de modal agregar usuario
  user = new User();
  repeatPass = "";
  rolesUser = [];
  loadingSave = false;

  //Variable de paginado
  p: number = 1;

  constructor(
    private apiUser: UserService,
    private apiRol: RolService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(new DateFormatter().isoDateTime(new Date()));
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.apiUser.get().subscribe(
    data => {
      this.users = data;
      this.loading = false;
    },
    error => {
      this.loading = false;
      this.toastr.error("Error al recuperar usuarios", "Usuarios");
    } );
    this.getRoles();
  }

  getRoles() {
    this.apiRol.get().subscribe(data => {
      this.roles = data.filter(it => {
        return it.type == "S";
      });
      setTimeout(() => {
        $("#rolSelect").selectpicker();
      }, 0);
    },
    error => {
      this.toastr.error("Error al recuperar roles", "Usuarios");
    });
  }

  async postUser() {
    if (this.check()) {
      if (this.repeatPass === this.user.password) {
        this.loadingSave = true;
        let idNewUser = null;
        this.user.username = this.user.email;
        this.user.is_active = true;
        this.user.date_joined = new DateFormatter().isoDateTime(new Date());
        await this.apiUser
          .post(this.user)
          .toPromise()
          .then(
            res => {
              idNewUser = res.id;
              this.toastr.success("Usuario creado correctamente", "Usuarios");
            },
            error => {
              this.toastr.error("Error al crear usuario", "Usuarios");
            }
          );
        if (this.rolesUser.length > 0) {
          this.apiUser
            .asignarRol(idNewUser, JSON.stringify(this.rolesUser))
            .subscribe(
              data => {
                this.toastr.success(
                  "Roles asignados correctamente",
                  "Usuarios"
                );
              },
              error => {
                this.toastr.error("Error al asignar roles", "Usuarios");
              }
            );
        }
        this.loadingSave = false;
      } else {
        this.toastr.error("Error, las contraseñas no coinciden", "Usuarios");
      }
    } else {
      this.toastr.error("Error, complete los campos", "Usuarios");
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
