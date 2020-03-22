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

  post(user: User): Observable<any> {
    return this.http.post(`${AppSettings.api}/user/`, user);
  }

  get(): Observable<any> {
    return this.http.get(`${AppSettings.api}/user/`);
  }

  asignarRol(id_user, roles): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("roles", roles);

    return this.http.post(
      `${AppSettings.api}/user/${id_user}/asignar-rol/`,
      {},
      { params: httpParams }
    );
  }
}
