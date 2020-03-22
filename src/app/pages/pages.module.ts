import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ListUsersComponent } from "./users/list-users/list-users.component";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [PagesComponent, DashboardComponent, ListUsersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgxPaginationModule,
    FormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule {}
