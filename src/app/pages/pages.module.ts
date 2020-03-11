import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [PagesComponent, DashboardComponent],
  imports: [CommonModule, HttpClientModule, PagesRoutingModule]
})
export class PagesModule {}
