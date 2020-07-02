import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/model';
import { NgForm } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  user = new User();
  roles = [];
  users = [];

  users2: User[];

  msgs = [];

  name: string;


  clonedUsers: { [s: string]: User; } = {};

  constructor(
      private userService: UserService,
      private toasty:      ToastyService,
      public auth: AuthService,
      private router: Router,
      private erroHandlerService: ErrorHandlerService
    ) { }

  ngOnInit(): void {
    console.log('Pelo menos eentra aui?');
    if(this.auth.hasPermission('ROLE_ADM')){
      this.listAllroles();
      this.listAllStoreUsers();
    }

  }

  save(form: NgForm){
    this.userService.save(this.user)
      .then(() => {

        if(this.auth.hasPermission('ROLE_ADM')){

          this.router.navigate(['/loja/novo']);

        }else if(this.auth.hasPermission('ROLE_ESTABELECIMENTO')){

          this.router.navigate(['/comanda/novo']);

        }
        this.user = new User();
        this.toasty.success('Usuário cadastrado com sucesso!');
      })
      .catch(error => {
        this.erroHandlerService.handle(error);
      });
  }

  listAllroles(){
    return this.userService.listAllRoles()
      .then(roles => {
        this.roles = roles.map( c =>  ({label: c.description, value: [{'idPermission' : c.idPermission, 'description' : c.description}] }));
      });
  }

  listAllStoreUsers(){
    this.userService.listAllStoreUsers()
      .then(response => {
        this.users = response;
      });
  }

  findStoreUsers() {
    if (this.auth.hasPermission('ROLE_ADM')) {
      if (this.name) {
        this.userService.findStoreUsers(this.name)
          .then(response => {
            this.users = response;
          });
      } else {
        this.listAllStoreUsers();
      }
    }

}

  onRowEditInit(user: User) {
    this.clonedUsers[user.idUser] = {...user};
}

onRowEditSave(user: User) {

    delete this.clonedUsers[user.idUser];

    console.log('User: ' + JSON.stringify(this.user));
    this.userService.updateByAdmin(user)
      .then( () => {
        this.toasty.success('Produto alterado com sucesso!');
        //this.list();
      } )
      .catch(error => this.erroHandlerService.handle(error));

}

onRowEditCancel(user: User, index: number) {
    this.users[index] = this.clonedUsers[user.idUser];
    delete this.clonedUsers[user.idUser];
    this.toasty.warning('Produto não atualizado!');
}

disable(user: User){

}




}
