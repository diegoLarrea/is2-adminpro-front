import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html',
  styleUrls: ['./mis-proyectos.component.css']
})
export class MisProyectosComponent implements OnInit {

  currentUser = null;
  proyectos = [];
  rnd = [];
  constructor(private apiAuth: AuthenticationService, private apiProyecto: ProyectoService) { 
    this.apiAuth.localStorage();
    this.currentUser = this.apiAuth.currentUserValue;
  }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos(){
    this.apiProyecto.getByUserId(this.currentUser.id).subscribe(
      data => {
        this.proyectos = data;
        for(let i=0; i< this.proyectos.length; i++){
          this.rnd.push(Math.floor(Math.random() * 6));
        }
      }
    )
  }

}
