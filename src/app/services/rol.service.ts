import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { AppSettings } from "./app.config";

@Injectable({
  providedIn: "root"
})
export class RolSistemaService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`api/roles-sistema/`);
  }

  post(body): Observable<any> {
    return this.http.post(`api/roles-sistema/`, body);
  }

  getByUserId(id): Observable<any>{
    return this.http.get(`api/user/${id}/roles-sistema`)
  }

  getPermisos(id_rol):Observable<any> {
    return this.http.get(`api/roles-sistema/${id_rol}/permisos`);
  }

  desasignarPermiso(id_rol, id_permiso): Observable<any> {
    return this.http.delete(`api/roles-sistema/${id_rol}/permisos/${id_permiso}`)
  }

  asignarPermiso(id_rol, id_permiso): Observable<any> {
    return this.http.post(`api/roles-sistema/${id_rol}/permisos/${id_permiso}`, {})
  }

  delete(id_rol): Observable<any> {
    return this.http.delete(`api/roles-sistema/${id_rol}`);
  }
}
