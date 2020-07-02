import { AuthService } from 'src/app/security/auth.service';
import { Component, OnInit } from '@angular/core';
import { CardService, CardFilter } from '../card.service';
import { Card } from 'src/app/core/model';
import { Observable, interval, Subscription } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-card-open-client',
  templateUrl: './card-open-client.component.html',
  styleUrls: ['./card-open-client.component.css']
})
export class CardOpenClientComponent implements OnInit {

  productsCard = [];
  cards = [];
  cardInfo = new Card();
  cardFilter = new CardFilter();
  totalCard: number = 0;
  display: Boolean;
  idUser = this.auth.jwtPayload.idUser;
  private updateSubscription: Subscription;
  displayClosedCards: Boolean;

  constructor(

    private cardservice: CardService,
    private auth: AuthService,
    private errorHandlerService: ErrorHandlerService

  ) { }


  ngOnInit(): void {

    this.updateSubscription = interval(5000).subscribe(
      (val) => { this.openCardClient();  } );

    this.openCardClient();
    this.listAllClosedCards();
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }


  openCardClient(){
    this.cardFilter.idUser = this.idUser;
    this.cardservice.openClientCard(this.cardFilter.idUser)
      .then(response => {
        if(response){
          this.display = true;
          this.cardInfo = response;
          this.listProductCard(this.cardInfo.idCard);
        }else{
          this.display = false;
        }
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  listProductCard(idCard: number){
    this.cardFilter.idCard = idCard;
    this.cardservice.cardOpen(this.cardFilter)
      .then(response => {

        this.productsCard = response;
        // calculando total da comanda
        let sum: number = 0;
        this.productsCard.forEach(a => sum += (a.product.value * a.amountProduct));
        this.totalCard = sum;
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  listAllClosedCards(){
    this.cardFilter.idUser = this.idUser;
    this.cardservice.listAllclosedCardByClient(this.cardFilter.idUser)
      .then(response => {
        if(!this.isEmpty(response)){
          this.displayClosedCards = true;
          this.cards = response;
        }else{
          this.displayClosedCards = false;
        }

      })
      .catch(error => this.errorHandlerService.handle(error));
  }

   isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

}
