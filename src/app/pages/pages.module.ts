import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ListUsersComponent } from "./admin/users/list-users/list-users.component";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule } from "@angular/forms";
import { ListarProyectoComponent } from './admin/proyectos/listar-proyecto/listar-proyecto.component';
import { AgregarProyectoComponent } from './admin/proyectos/agregar-proyecto/agregar-proyecto.component';
import { EditarProyectoComponent } from './admin/proyectos/editar-proyecto/editar-proyecto.component';
import { MisProyectosComponent } from './proyectos/mis-proyectos/mis-proyectos.component';
import { ListRolesComponent } from './admin/roles/list-roles/list-roles.component';
import { PermisosRolSistemaComponent } from './admin/roles/permisos-rol-sistema/permisos-rol-sistema.component';

@NgModule({
  declarations: [
    PagesComponent,
    ListUsersComponent,
    ListarProyectoComponent,
    AgregarProyectoComponent,
    EditarProyectoComponent,
    MisProyectosComponent,
    ListRolesComponent,
    PermisosRolSistemaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule {}
