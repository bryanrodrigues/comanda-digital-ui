import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from 'src/app/security/auth.service';
import { UserService } from './../../user/user.service';
import { Card, User } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CardService } from '../card.service';
import { ToastyService } from 'ng2-toasty';
import { stringify } from 'querystring';

@Component({
  selector: 'app-card-registration',
  templateUrl: './card-registration.component.html',
  styleUrls: ['./card-registration.component.css']
})
export class CardRegistrationComponent implements OnInit {

  card = new Card();
  idStore = this.auth.jwtPayload.idStore;
  positiveInt: RegExp = /(\^-|^\d)|\d+/;

  constructor(
    private cardSerivce: CardService,
    private toasty:      ToastyService,
    private userService: UserService,
    private auth: AuthService,
    private errorHandlerService: ErrorHandlerService
    ) { }

  ngOnInit(): void {
  }


  saveCard(form: NgForm){

     // tslint:disable-next-line: align
     this.userService.findByCpf(this.card.user.cpf)
      .then(user => {

        if (user){
          this.card.user = user;
          // tslint:disable-next-line:align
          if ( this.card.user.idUser ){
            this.save(form);
          }
        }else{
          this.toasty.warning('Usuário inexistente, favor cadastra-lo!');
        }

      })
      .catch(error => this.errorHandlerService.handle(error));


  }

  save(form: NgForm){
    this.card.store.idStore = this.idStore;

    this.cardSerivce.save(this.card)
      .then(() => {
        this.toasty.success('Comanda cadastrada com sucesso');
        form.reset();
        this.card = new Card();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }





}
