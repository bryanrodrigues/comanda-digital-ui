import { AuthService } from 'src/app/security/auth.service';
import { ToastyService } from 'ng2-toasty';
import { CardService, CardFilter } from './../card.service';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/core/model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-card-open',
  templateUrl: './card-open.component.html',
  styleUrls: ['./card-open.component.css']
})
export class CardOpenComponent implements OnInit {

  filterCard = new CardFilter();
  cards = [];
  idStore = this.auth.jwtPayload.idStore;

  positiveInt: RegExp = /(\^-|^\d)|\d+/;

  constructor(
    private cardService: CardService,
    private toasty: ToastyService,
    private auth: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.listAll();
  }

  close(card: Card){
    this.cardService.closeCard(card)
      .then(() =>{
        this.toasty.success('Comanda fechada com sucesso!');
        this.listAll();

      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  listAll(){
    this.filterCard.idStore = this.idStore;
    this.cardService.listAllOpenCards(this.filterCard.idStore)
      .then(response => {
         this.cards = response;

      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  findByTable(){

    if(this.filterCard.tableNumber){
      this.filterCard.idStore = this.idStore;
      this.cardService.findByTable(this.filterCard)
      .then(response => {
         this.cards = response;
      })
      .catch(error => this.errorHandlerService.handle(error));
    }else{
      this.listAll();
    }
  }


}
