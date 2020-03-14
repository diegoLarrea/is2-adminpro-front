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
  private tokenSubject: BehaviorSubject<String>;
  public token: Observable<String>;

  constructor(private http: HttpClient) {}

  public localStorage() {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.tokenSubject = new BehaviorSubject<String>(
      localStorage.getItem("token")
    );
    this.token = this.tokenSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get tokenValue(): String {
    return this.tokenSubject.value;
  }

  login(correoElectronico: string, password: string): Observable<any> {
    const body = { username: correoElectronico, password: password };
    return this.http.post(`${AppSettings.api}/api/login/`, body);
    //   localStorage.setItem("currentUser", JSON.stringify(usuario));
    //   this.currentUserSubject.next(usuario);
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    localStorage.removeItem("token");
    this.tokenSubject.next(null);
  }

  async isAuthenticated(token) {
    let header = new HttpHeaders({
      Authorization: `Token ${token}`
    });
    return await this.http
      .get<any>(`${AppSettings.sso}/api/isAuth/`, {
        headers: header
      })
      .toPromise()
      .then(res => {
        if (res.status === 401) {
          return { auth: false };
        } else {
          return { auth: true };
        }
      });
  }

  saveData(user, token) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("token", token);
  }
}
