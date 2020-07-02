import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthService } from '../security/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';


@NgModule({
  declarations: [NavbarComponent,  PageNotFoundComponent, AccessDeniedComponent],
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    RouterModule,
    PanelMenuModule
  ],
  exports : [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule,

  ],
  providers: [
    AuthService,
    JwtHelperService
  ]

})
export class CoreModule { }
