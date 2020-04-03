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

      let u = JSON.parse(localStorage.getItem("currentUser"))
      let perms = [];
      for(let i=0; i< u.permisos_sistema.length; i++){
        let rol = u.permisos_sistema[i];
        for(let j=0; j< rol.permisos.length; j++){
          perms.push(rol.permisos[j].permiso)
        }
      }

      if (route.firstChild.data.permiso && perms.indexOf(route.data.permiso) === -1){
        this.router.navigate([""]);
        return false;
      }
      
      return this.promiseResult;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
