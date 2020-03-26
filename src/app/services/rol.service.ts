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

  asignarPermiso(id_rol, id_permiso): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("permiso", id_permiso);

    return this.http.post(
      `api/rol/${id_rol}/asignar-permiso/`,
      {},
      { params: httpParams }
    );
  }
}
