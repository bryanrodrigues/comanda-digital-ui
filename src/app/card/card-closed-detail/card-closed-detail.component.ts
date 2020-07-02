import { AuthService } from 'src/app/security/auth.service';
import { ProductService, ProductFilter } from './../../product/product.service';
import { Component, OnInit } from '@angular/core';
import { CardService, CardFilter } from '../card.service';
import { ActivatedRoute } from '@angular/router';
import { Product, Card, ProductCard } from 'src/app/core/model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-card-closed-detail',
  templateUrl: './card-closed-detail.component.html',
  styleUrls: ['./card-closed-detail.component.css']
})
export class CardClosedDetailComponent implements OnInit {

  display: boolean = false;
  filter = new CardFilter();
  productFilter = new ProductFilter();
  cardFilter    = new CardFilter();

  product = new Product();
  cardInfo = new Card();
  productCard = new ProductCard();
  totalCard: number = 0;
  idStore = this.auth.jwtPayload.idStore;

  productsCard = [];

  constructor(
    private cardservice: CardService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private errorHandlerService: ErrorHandlerService
    ) { }


  ngOnInit(): void {
    this.listProductCard(this.route.snapshot.params['idStore']);

  }

  listProductCard(idCard: number){
    this.filter.idCard =idCard ;
    this.cardservice.cardOpen(this.filter)
      .then(response => {

        this.productsCard = response;

        // calculando total da comanda
        let sum: number = 0;
        this.productsCard.forEach(a => sum += (a.product.value * a.amountProduct));
        this.totalCard = sum;
        // buscando informações da comanda
        this.cardDetail(this.filter.idCard);
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  cardDetail(idCard: number){

    if(this.auth.hasPermission('ROLE_ESTABELECIMENTO')){
      this.cardFilter.idStore = this.idStore;
      this.cardservice.cardDetail(this.cardFilter.idStore,  idCard)
        .then(resposne => {
          this.cardInfo = resposne;
        })
        .catch(error => this.errorHandlerService.handle(error));
    }else{
      this.cardservice.cardClientDetail(idCard)
        .then(resposne => {
          this.cardInfo = resposne;
        })
        .catch(error => this.errorHandlerService.handle(error));
    }
 }



}
