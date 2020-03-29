import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-permisos-rol-sistema',
  templateUrl: './permisos-rol-sistema.component.html',
  styleUrls: ['./permisos-rol-sistema.component.css']
})
export class PermisosRolSistemaComponent implements OnInit {
  p: number = 1;
  loading = false;
  asignados = [];
  idRol = null;
  rol = {
    id: null,
    nombre: "",
    type: "",
    permisos_asignados: [],
    permisos_disponibles: []
  }
  constructor(private route: ActivatedRoute, private apiRol: RolService) { 
    this.idRol = route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.obtenerPermisos();
  }

  obtenerPermisos(){
    this.loading = true;
    this.apiRol.obtenerPermisos(this.idRol).subscribe(
      data => {
        this.rol = data;
        this.loading = false;
      }
    )
  }

  asignarPermiso(idPermiso){
    this.apiRol.asignarPermiso(this.idRol, idPermiso).subscribe(
      data => {this.obtenerPermisos()},
      error => {}
    )
  }

  desasignarPermiso(idPermiso){
    this.apiRol.desasignarPermiso(this.idRol, idPermiso).subscribe(
      data => {this.obtenerPermisos()},
      error => {}
    )
  }

}
