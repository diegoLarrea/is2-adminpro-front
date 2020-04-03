import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { DateFormatter } from 'src/app/utils/date.formatter';
import { UserService } from 'src/app/services/user.service';
import { RolSistemaService } from 'src/app/services/rol.service';
import { ToastrService } from 'ngx-toastr';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { RolProyectoService } from 'src/app/services/rolProyecto.service';
import { NgxPermissionsService } from 'ngx-permissions';
declare var $:any;
@Component({
  selector: 'app-proyecto-users',
  templateUrl: './proyecto-users.component.html',
  styleUrls: ['./proyecto-users.component.css']
})
export class ProyectoUsersComponent implements OnInit {
    @Input() idProyecto: any;
    @Input() detalles: any;
    @Input() perms: any;
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
      private permissionsService: NgxPermissionsService,
      private apiUser: UserService,
      private apiProyecto: ProyectoService,
      private apiRol: RolProyectoService,
      private toastr: ToastrService
    ) {}
  
    ngOnInit(): void {
      this.getUsers();
      // this.permissionsService.loadPermissions(this.perms);
    }
  
    getUsers() {
      this.loading = true;
      this.apiProyecto.getUsers(this.idProyecto).subscribe(
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
      this.apiRol.get(this.idProyecto).subscribe(data => {
        this.roles = data;
        for(let i=0; i<this.roles.length; i++){
          this.isChecked.push(false);
        }
      },
      error => {
        this.toastr.error("Error al recuperar roles", "Usuarios");
      });
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
      this.apiRol.getByUserId(user.id, this.idProyecto).subscribe(
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
  
  
    asignarRol(userId, rolId){
      this.apiUser.postUserRolProyecto(userId, rolId).subscribe(
        data => {
          this.getUserRoles(this.userRolModal);
        }
      )
    }
  
    desasignarRol(userId, rolId){
      this.apiUser.deleteUserRolProyecto(userId, rolId).subscribe(
        data => {
          this.getUserRoles(this.userRolModal);
        }
      )
    }
    usersAll = [];
    loadingAllUsers = false;
    getAllUsers(){
      this.usersAll = [];
      this.loadingAllUsers = true;
      this.apiUser.get().subscribe(
        data => {
          for(let i=0; i< data.length; i++){
            let isIn = false;
            for(let j=0; j< this.users.length; j++){
              if(data[i].id == this.users[j].id){
                isIn = true;
                break;
              }
            }
            if(!isIn){
              this.usersAll.push(data[i]);
            }
          }
          this.loadingAllUsers = false;
        }
      )
    }

    // modal Agregar usuario
    showAdd = false;
    usuarioRolModal:User = new User();
    rolesAsignadosRolModal = [];
    isChecked = [];
    checkValue(el: any){
      if(this.isChecked[el.pos]){
        this.rolesAsignadosRolModal.push(el.rol);
      }else{
        this.rolesAsignadosRolModal.splice(el.pos,1);
      }
    }
    
    agregarUsuarioProyecto(usuario, roles){
      if(roles.length != 0){
        const body = {
          roles: roles,
          usuario: usuario
        }
        this.apiProyecto.agergarUsuario(body).subscribe(
          data => {
            this.getAllUsers();
            this.getUsers();
            $('#addRolModal').modal('hide');
            this.isChecked = [];
            for(let i=0; i<this.roles.length; i++){
              this.isChecked.push(false);
            }
            this.toastr.success("Usuario agregado");
          }
        )
      } else {
        this.toastr.error("Seleccione rol");
      }
    }
}
