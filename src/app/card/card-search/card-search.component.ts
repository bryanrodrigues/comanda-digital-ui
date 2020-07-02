
import { AuthService } from 'src/app/security/auth.service';
import { CardService, CardFilter } from './../card.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent implements OnInit {

  filterCard = new CardFilter();
  cards = [];
  idStore = this.auth.jwtPayload.idStore;

  period = {};

  firstDate : Date;
  secondDate : Date;
  msgs = [];
  valid: Boolean;

  constructor(
    private cardService: CardService,
    private auth: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.findByPeriod();
  }

  view(){

  }

  validateDate(){
    if(this.firstDate > this.secondDate){

      this.msgs.push({severity:'warn', summary:'Opa!', detail:'A data inicial não pode ser maior que a data final!'});

      this.valid = true;
    }else{
      this.msgs = [];
      this.valid = false;
    }
  }

  findByPeriod(){

    this.period = {'idStore' : this.idStore, 'firstDate' : this.firstDate, 'secondDate': this.secondDate};
    this.cardService.finClosedCardsByPeriod(this.period)
    .then(response => {
      this.cards = response;
   })
   .catch(error => this.errorHandlerService.handle(error));

  }



}
