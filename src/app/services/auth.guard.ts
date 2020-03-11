import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSettings } from "./app.config";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {}
  promiseResult: boolean;
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    const token = this.authenticationService.tokenValue;
    if (currentUser && token) {
      let header = new HttpHeaders({
        Authorization: `Token ${token}`
      });
      await this.http
        .get<any>(`${AppSettings.sso}/api/isAuth/`, {
          headers: header
        })
        .toPromise()
        .then(res => {
          this.promiseResult = true;
        })
        .catch(err => {
          this.promiseResult = false;
        });
      if (!this.promiseResult) {
        this.router.navigate(["/login"]);
      }
      return this.promiseResult;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
