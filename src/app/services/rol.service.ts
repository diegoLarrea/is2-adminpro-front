import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { AppSettings } from "./app.config";

@Injectable({
  providedIn: "root"
})
export class RolService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`api/rol/`);
  }

  post(body): Observable<any> {
    return this.http.post(`api/rol/`, body);
  }

  obtenerPermisos(id_rol):Observable<any> {
    return this.http.get(`api/rol/${id_rol}/permisos`);
  }

  desasignarPermiso(id_rol, id_permiso): Observable<any> {
    return this.http.delete(`api/rol/${id_rol}/permisos/${id_permiso}`)
  }

  asignarPermiso(id_rol, id_permiso): Observable<any> {
    return this.http.post(`api/rol/${id_rol}/permisos/${id_permiso}`, {})
  }
}
