import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-listar-proyecto',
  templateUrl: './listar-proyecto.component.html',
  styleUrls: ['./listar-proyecto.component.css']
})
export class ListarProyectoComponent implements OnInit {

  loading = true;
  proyectos = [];
  p:number = 1;
  constructor(private apiProyecto: ProyectoService) { }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos(){
    this.apiProyecto.get().subscribe(
      data => {
        this.proyectos = data;
        this.loading = false;
      }
    )
  }

}
