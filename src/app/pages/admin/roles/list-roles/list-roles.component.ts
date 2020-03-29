import { Component, OnInit } from '@angular/core';
import { User } from "../../../../models/user";
import { UserService } from "../../../../services/user.service";
import { RolService } from "../../../../services/rol.service";
import { ToastrService } from "ngx-toastr";
import { DateFormatter } from "../../../../utils/date.formatter";
declare var $:any;
@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit {

    //Variables de pantalla principal
    loading = true;
    roles = [];
  
    //Variables de modal agregar rol
    user = new User();
    loadingSave = false;
  
    //Variable de paginado
    p: number = 1;
  
    rol: string = "";
    constructor(
      private apiUser: UserService,
      private apiRol: RolService,
      private toastr: ToastrService
    ) {}
  
    ngOnInit(): void {
      this.getRoles();
    }
  
    getRoles() {
      this.loading = true;
      this.apiRol.get().subscribe(data => {
        this.roles = data.filter(it => {
          return it.type == "S";
        });
        this.loading = false;
      },
      error => {
        this.toastr.error("Error al recuperar roles", "Usuarios");
      });
    }
  
    postRol(){
      if(this.rol != ""){
        this.loadingSave = true;
        let body = {
          nombre: this.rol,
          type: 'S'
        }
        this.apiRol.post(body).subscribe(
          data => {
            this.toastr.success("Rol agregado");
            this.rol = "";
            this.loadingSave = false;
          },
          error => {
            this.toastr.error("Error al guardar rol");
            this.loadingSave = false;
          }
        )
      }
    }
}
