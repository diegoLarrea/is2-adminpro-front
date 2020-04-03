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
import { MisProyectosDetailComponent } from './proyectos/mis-proyectos-detail/mis-proyectos-detail.component';

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
        component: MisProyectosComponent
      },
      {
        path: "mis-proyectos/:id",
        component: MisProyectosDetailComponent
      },
      {
        path: "administracion/proyectos",
        component: ListarProyectoComponent,
        data: { permiso: "per_proyectos_listar" }
      },
      {
        path: "administracion/proyectos/agregar",
        component: AgregarProyectoComponent,
        data: { permiso: "per_proyectos_agregar" }
      },
      {
        path: "administracion/proyectos/editar/:id",
        component: EditarProyectoComponent,
        data: { permiso: "per_proyectos_agregar" }
      },
      {
        path: "administracion/usuarios",
        component: ListUsersComponent,
        data: { permiso: "per_usuarios_listar" }
      },
      {
        path: "administracion/roles-sistema",
        component: ListRolesComponent,
        data: { permiso: "per_roles_sistema_listar" }
      },
      {
        path: "administracion/roles-sistema/:id/gestionar",
        component: PermisosRolSistemaComponent,
        data: { permiso: "per_roles_sistema_editar" }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
