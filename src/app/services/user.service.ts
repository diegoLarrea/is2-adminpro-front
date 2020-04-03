import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { AppSettings } from "./app.config";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  post(body): Observable<any> {
    return this.http.post(`api/user/`, body);
  }

  get(): Observable<any> {
    return this.http.get(`api/user/`);
  }

  put(user: User): Observable<any> {
    return this.http.put(`api/user/${user.id}`, user);
  }

  postUserRolSistema(idUser,idRol): Observable<any> {
    return this.http.post(`api/user/${idUser}/roles-sistema/${idRol}`, {})
  }

  deleteUserRolSistema(idUser,idRol): Observable<any> {
    return this.http.delete(`api/user/${idUser}/roles-sistema/${idRol}`, {})
  }

  postUserRolProyecto(idUser,idRol): Observable<any> {
    return this.http.post(`api/user/${idUser}/roles-proyecto/${idRol}`, {})
  }

  deleteUserRolProyecto(idUser,idRol): Observable<any> {
    return this.http.delete(`api/user/${idUser}/roles-proyecto/${idRol}`, {})
  }
}
