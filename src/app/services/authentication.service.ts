import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { User } from "../models/user";
import { AppSettings } from "./app.config";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private tokenSubject: BehaviorSubject<Object>;
  public token: Observable<Object>;

  constructor(private http: HttpClient) {}

  public localStorage() {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.tokenSubject = new BehaviorSubject<Object>(
      localStorage.getItem("token")
    );
    this.token = this.tokenSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get tokenValue(): Object {
    return this.tokenSubject.value;
  }

  login(correoElectronico: string, password: string): Observable<any> {
    const body = { username: correoElectronico, password: password };
    return this.http.post(`${AppSettings.api}/login/`, body);
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    localStorage.removeItem("token");
    this.tokenSubject.next(null);
  }

  saveData(user, token) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
  }
}
