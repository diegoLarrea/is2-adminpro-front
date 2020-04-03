import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Proyecto } from 'src/app/models/proyecto';
import { NgxPermissionsService } from 'ngx-permissions';
declare var $:any;
@Component({
  selector: 'app-mis-proyectos-detail',
  templateUrl: './mis-proyectos-detail.component.html',
  styleUrls: ['./mis-proyectos-detail.component.css']
})
export class MisProyectosDetailComponent implements OnInit {
  proyectoId = null;
  proyecto: Proyecto = new Proyecto();
  constructor(private permissionsService: NgxPermissionsService,private route: ActivatedRoute, private apiProyecto: ProyectoService) { 
    this.proyectoId = route.snapshot.paramMap.get("id");
  }

  perms = []
  ngOnInit(): void {
    let u = JSON.parse(localStorage.getItem("currentUser"))
    
    for(let i=0; i< u.permisos_proyectos.length; i++){
      let rol = u.permisos_proyectos[i];
      if(rol.rol.proyecto == this.proyectoId){
        for(let j=0; j< rol.permisos.length; j++){
          this.perms.push(rol.permisos[j].permiso)
        }
      }
    }
    this.permissionsService.loadPermissions(this.perms);

    this.get();
    setTimeout(()=> {
      this.tabActivate("detalles");
    },1000)

  }

  get(){
    this.apiProyecto.getById(this.proyectoId).subscribe(
      data => {
        this.proyecto = data;
      }
    )
  }

  tabActivate(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
  }
}
