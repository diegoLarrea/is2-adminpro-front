import { Component, OnInit, Input } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-proyecto-detalles',
  templateUrl: './proyecto-detalles.component.html',
  styleUrls: ['./proyecto-detalles.component.css']
})
export class ProyectoDetallesComponent implements OnInit {

  @Input() detalles: any;
  @Input() perms: any;
  constructor(private permissionsService: NgxPermissionsService) { }

  ngOnInit(): void {
    // this.permissionsService.loadPermissions(this.perms);
  }

}
