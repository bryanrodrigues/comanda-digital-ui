import { UserChangePassword } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model';
import { UserService } from '../user.service';
import { AuthService } from 'src/app/security/auth.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  idUser  = this.auth.jwtPayload.idUser;

  user = new User();

  userP = new UserChangePassword();

  password: string;
  firstPassword: string;
  secondPassword: String;
  msgs = [];
  msg: String;
  valid: Boolean;


  constructor(
    private userService: UserService,
    private auth: AuthService,
    private toasty: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fillFileds();
  }

  fillFileds(){
    this.userService.findById(this.idUser)
      .then(response => {
        this.user = response;
        this.user.password = '';
      })
  }

  update(){
    this.userService.update(this.user)
      .then(() => {
        this.toasty.success('Conta alterada com sucesso!');
        this.user = new User();
        this.auth.loggout();
        this.router.navigate(['/login']);

      })
      .catch(error => this.errorHandlerService.handle(error));
  }


  updatePassword(){
    this.userP.idUser = this.idUser;
    this.userP.newPassword = this.firstPassword;
    this.userService.updatePassword(this.userP)
      .then(() => {
        this.toasty.success('Senha alterada com sucesso!');
        this.auth.loggout();
        this.router.navigate(['/login']);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  validatePassword(){
    if(this.firstPassword != this.secondPassword){

      if(this.msgs.length == 0){
        this.msgs.push({severity:'warn', summary:'Opa!', detail:'As senhas não correspondem!'});
      }
      this.valid = true;
    }else{
      this.msgs = [];
      this.valid = false;
    }
  }

}
