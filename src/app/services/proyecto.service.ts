import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { AppSettings } from "./app.config";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class ProyectoService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`api/proyecto/`);
  }

  post(body): Observable<any> {
    return this.http.post(`api/proyecto/`, body);
  }

  getByUserId(idUser): Observable<any> {
    return this.http.get(`api/proyecto/user/${idUser}`);
  }

  getById(id): Observable<any>{
    return this.http.get(`api/proyecto/${id}`);
  }

  getUsers(id): Observable<any> {
    return this.http.get(`api/proyecto/${id}/users`);
  }

  agergarUsuario(body): Observable<any> {
    return this.http.post(`api/proyecto/user`, body);
  }
}