import { Component, OnInit } from "@angular/core";
import { User } from "../../../../models/user";
import { UserService } from "../../../../services/user.service";
import { RolSistemaService } from "../../../../services/rol.service";
import { ToastrService } from "ngx-toastr";
import { DateFormatter } from "../../../../utils/date.formatter";
import { NgxPermissionsService } from 'ngx-permissions';

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
  rolesAsignados = [];
  loadingSave = false;

  //Variable de paginado
  p: number = 1;

  constructor(
    private apiUser: UserService,
    private apiRol: RolSistemaService,
    private toastr: ToastrService,
    private permissionsService: NgxPermissionsService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    let u = JSON.parse(localStorage.getItem("currentUser"))
    let perms = [];
    for(let i=0; i< u.permisos_sistema.length; i++){
      let rol = u.permisos_sistema[i];
      for(let j=0; j< rol.permisos.length; j++){
        perms.push(rol.permisos[j].permiso)
      }
    }
    this.permissionsService.loadPermissions(perms);
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
      this.roles = data;
      setTimeout(() => {
        $("#rolSelect").selectpicker();
      }, 0);
    },
    error => {
      this.toastr.error("Error al recuperar roles", "Usuarios");
    });
  }

  postUser() {
    if (this.check()) {
      if (this.repeatPass === this.user.password) {
        this.loadingSave = true;
        this.user.username = this.user.email;
        this.user.is_active = true;
        this.user.date_joined = new DateFormatter().isoDateTime(new Date());
        const body = {
          user: this.user,
          roles: this.rolesAsignados
        }
        console.log(body);
        this.apiUser.post(body).subscribe(
          data => {
            this.toastr.success("Usuario creado");
            this.getUsers();
          },
          error => {
            this.toastr.error("Error al crear usuario");
          }
        )
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
    this.rolesAsignados = [];
    setTimeout(() => {
      $("#rolSelect").selectpicker();
    }, 0);
  }

  userRoles = [];
  userRolModal: User = new User();
  userRolesDisponibles = [];
  loadingUserRoles = false;
  getUserRoles(user){
    this.loadingUserRoles = true;
    this.userRolModal = user;
    this.userRoles = [];
    this.userRolesDisponibles = [];
    this.apiRol.getByUserId(user.id).subscribe(
      data =>{
        this.userRoles = data;

        for(let i=0; i< this.roles.length; i++){
          let isIn = false;
          for(let j=0; j<this.userRoles.length; j++){
            if(this.roles[i].id == this.userRoles[j].id){
              isIn = true;
              break;
            }
          }
          if(!isIn){
            this.userRolesDisponibles.push(this.roles[i]);
          }
        }

        this.loadingUserRoles = false;
      }
    )
  }

  updateUser(user){
    user.is_active = !user.is_active;

    this.apiUser.put(user).subscribe(
      data => {
        this.getUsers();
      }
    )
  }

  asignarRol(userId, rolId){
    this.apiUser.postUserRolSistema(userId, rolId).subscribe(
      data => {
        this.getUserRoles(this.userRolModal);
      }
    )
  }

  desasignarRol(userId, rolId){
    this.apiUser.deleteUserRolSistema(userId, rolId).subscribe(
      data => {
        this.getUserRoles(this.userRolModal);
      }
    )
  }
}
