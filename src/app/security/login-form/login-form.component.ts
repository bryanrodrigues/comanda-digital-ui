import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private toasty: ToastyService
  ) { }


  login(user: string, password: string) {
    this.auth.login(user, password)
      .then(() => {

        if(this.auth.hasPermission('ROLE_ADM')){

          this.router.navigate(['/usuario/novo']);

        }else if(this.auth.hasPermission('ROLE_ESTABELECIMENTO')){
          if(this.auth.jwtPayload.idStore){

            this.router.navigate(['/dashboard']);
          }else{
            this.toasty.error('Usuário bloqueado!');
          }

        }else if(this.auth.hasPermission('ROLE_CLIENTE')){
          this.router.navigate(['/inicio/cliente']);

        }

      })
      .catch(error => {
        this.errorHandler.handle(error);
      });
  }





}
