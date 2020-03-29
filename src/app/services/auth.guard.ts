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
    this.authenticationService.localStorage();
    const currentUser = this.authenticationService.currentUserValue;
    const token = this.authenticationService.tokenValue;
    if (currentUser && token) {
      await this.http
        .post<any>(`api/is_auth/`, token)
        .toPromise()
        .then(res => {
          this.authenticationService.saveData(currentUser, res.firebase);
          this.promiseResult = true;
        })
        .catch(err => {
          this.authenticationService.logout();
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
