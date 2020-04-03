import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service'
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-agregar-proyecto',
  templateUrl: './agregar-proyecto.component.html',
  styleUrls: ['./agregar-proyecto.component.css']
})
export class AgregarProyectoComponent implements OnInit {

  constructor(private apiUser: UserService, private apiProyecto: ProyectoService, private toastr: ToastrService) { }

  usuarios = [];

  proyecto: Proyecto = new Proyecto();
  user = null;
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.apiUser.get().subscribe(
      data => {
        this.usuarios = data;
        setTimeout(() => {
          $("#userSelect").selectpicker();
        }, 0);
      }
    )
  }

  postProyecto(){
    if(this.user != null && this.proyecto.descripcion != null && this.proyecto.nombre  != null){
      const body = {
        proyecto: this.proyecto,
        gerente: this.user
      }
      this.apiProyecto.post(body).subscribe(
        data => {
          this.toastr.success("Proyecto creado")
          this.proyecto = new Proyecto();
          this.user = null;
        },
        error => {
          this.toastr.error("Error al crear proyecto");
        }
      )
    }else {
      this.toastr.error("Complete los campos");
    }
    
  }
}
