import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { AppSettings } from "./app.config";

@Injectable({
  providedIn: "root"
})
export class RolProyectoService {
  constructor(private http: HttpClient) {}

  get(id): Observable<any> {
    return this.http.get(`api/proyecto/${id}/roles-proyecto`);
  }

  post(body): Observable<any> {
    return this.http.post(`api/roles-proyecto/`, body);
  }

  getByUserId(idUser, idProyecto): Observable<any>{
    return this.http.get(`api/user/${idUser}/proyecto/${idProyecto}/roles`)
  }

  getPermisos(id_rol):Observable<any> {
    return this.http.get(`api/roles-proyecto/${id_rol}/permisos`);
  }

  desasignarPermiso(id_rol, id_permiso): Observable<any> {
    return this.http.delete(`api/roles-proyecto/${id_rol}/permisos/${id_permiso}`)
  }

  asignarPermiso(id_rol, id_permiso): Observable<any> {
    return this.http.post(`api/roles-proyecto/${id_rol}/permisos/${id_permiso}`, {})
  }

  delete(id_rol): Observable<any> {
    return this.http.delete(`api/roles-proyecto/${id_rol}`);
  }
}
