import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { RolProyectoService } from 'src/app/services/rolProyecto.service';
import { NgxPermissionsService } from 'ngx-permissions';
declare var $:any;
@Component({
  selector: 'app-proyecto-roles',
  templateUrl: './proyecto-roles.component.html',
  styleUrls: ['./proyecto-roles.component.css']
})
export class ProyectoRolesComponent implements OnInit {

    @Input() idProyecto: any;
    @Input() perms: any;
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
      private permissionsService: NgxPermissionsService,
      private apiUser: UserService,
      private apiRol: RolProyectoService,
      private toastr: ToastrService
    ) {}
  
    ngOnInit(): void {
      this.getRoles();
      // this.permissionsService.loadPermissions(this.perms);
    }
  
    getRoles() {
      this.loading = true;
      this.apiRol.get(this.idProyecto).subscribe(data => {
        this.roles = data;
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
          proyecto: this.idProyecto
        }
        this.apiRol.post(body).subscribe(
          data => {
            this.toastr.success("Rol agregado");
            this.rol = "";
            this.loadingSave = false;
            this.getRoles();
          },
          error => {
            this.toastr.error("Error al guardar rol");
            this.loadingSave = false;
          }
        )
      }
    }

    eliminarRol(id){
      this.apiRol.delete(id).subscribe(
        data => {
          this.getRoles();
        },
        error => {
          let err = error.error;

          if(err.error){
            if(err.hasOwnProperty("mensaje")){
              this.toastr.error(err.mensaje);
            }else{
              this.toastr.error("Error al eliminar rol");
            }
          }else{
            this.toastr.error("Error al eliminar rol");
          }
        }
      )
    }

    rolPermisosModalRestul = {
      rol: {
        id: null,
        nombre: "",
        proyecto: null
      },
      permisos_asignados: [],
      permisos_disponibles: []
    }
    rolPermisosModal = null;
    obtenerPermisos(rol){
      this.rolPermisosModal = rol;
      this.loading = true;
      this.apiRol.getPermisos(rol.id).subscribe(
        data => {
          this.rolPermisosModalRestul = data;
          this.loading = false;
        }
      )
    }
  
    asignarPermiso(idPermiso){
      this.apiRol.asignarPermiso(this.rolPermisosModal.id, idPermiso).subscribe(
        data => {this.obtenerPermisos(this.rolPermisosModal)},
        error => {}
      )
    }
  
    desasignarPermiso(idPermiso){
      this.apiRol.desasignarPermiso(this.rolPermisosModal.id, idPermiso).subscribe(
        data => {this.obtenerPermisos(this.rolPermisosModal)},
        error => {}
      )
    }
}
