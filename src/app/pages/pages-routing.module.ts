import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { AuthGuard } from "../services/auth.guard";
import { ListUsersComponent } from "./admin/users/list-users/list-users.component";
import { ListarProyectoComponent } from './admin/proyectos/listar-proyecto/listar-proyecto.component';
import { MisProyectosComponent } from './proyectos/mis-proyectos/mis-proyectos.component';
import { AgregarProyectoComponent } from './admin/proyectos/agregar-proyecto/agregar-proyecto.component';
import { EditarProyectoComponent } from './admin/proyectos/editar-proyecto/editar-proyecto.component';
import { ListRolesComponent } from './admin/roles/list-roles/list-roles.component';
import { PermisosRolSistemaComponent } from './admin/roles/permisos-rol-sistema/permisos-rol-sistema.component';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "mis-proyectos",
        pathMatch: "full"
      },
      {
        path: "mis-proyectos",
        component: MisProyectosComponent,
        data: { permiso: "login" }
      },
      {
        path: "administracion/proyectos",
        component: ListarProyectoComponent,
      },
      {
        path: "administracion/proyectos/agregar",
        component: AgregarProyectoComponent,
      },
      {
        path: "administracion/proyectos/editar/:id",
        component: EditarProyectoComponent,
      },
      {
        path: "administracion/usuarios",
        component: ListUsersComponent
      },
      {
        path: "administracion/roles-sistema",
        component: ListRolesComponent
      },
      {
        path: "administracion/roles-sistema/:id/gestionar",
        component: PermisosRolSistemaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
