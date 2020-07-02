import { AuthService } from 'src/app/security/auth.service';
import { ToastyService } from 'ng2-toasty';
import { FormsModule } from '@angular/forms';
import { ProductService, ProductFilter } from './../../product/product.service';
import { ProductCard, Product, Card } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { CardService, CardFilter } from '../card.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.css']
})
export class CardAddComponent implements OnInit {


  display: boolean = false;
  filter = new CardFilter();
  productFilter = new ProductFilter();
  cardFilter    = new CardFilter();

  product = new Product();
  cardInfo = new Card();
  productCard = new ProductCard();
  totalCard: number = 0;

    positiveInt: RegExp = /(\^-|^\d)|\d+/;

  idStore = this.auth.jwtPayload.idStore;

  products = [];
  productsCard = [];


  ngOnInit(): void {
    this.listProductCard(this.route.snapshot.params['idCard']);
    this.listProductStore();

  }



  constructor(
    private cardservice: CardService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private toasty: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private auth: AuthService
    ) { }



  addProductCard(form: FormsModule){
    this.productCard.card.idCard = this.route.snapshot.params['idCard'];// this.cardInfo.card.idCard;
    this.productCard.card.store.idStore = this.idStore;

    this.cardservice.addProductCard(this.productCard)
      .then(response =>{
          this.listProductCard(this.route.snapshot.params['idCard']);
          this.toasty.success('Produto adicionado com sucesso!');
          this.productCard.amountProduct = null;
          this.productCard.product.idProduct = null;
          this.productCard.note = null;
        })
        .catch(error => this.errorHandlerService.handle(error));
  }

  editProductCard(productCard: ProductCard){
    this.cardservice.editProductCard(productCard)
    .then(response =>{
        this.listProductCard(this.route.snapshot.params['idCard']);
        this.toasty.success('Produto atualizado com sucesso!');
      })
      .catch(error => this.errorHandlerService.handle(error));
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

    listProductStore(){
      this.productFilter.idStore = this.idStore;

      this.productService.list(this.productFilter)
      .then(response => {
        this.products = response.map( c => ({label: c.name, value: c.idProduct}) );
      })
      .catch(error => this.errorHandlerService.handle(error));
    }


   cardDetail(idCard: number){

      this.cardFilter.idStore = this.idStore;
      this.cardservice.cardDetail(this.cardFilter.idStore,  idCard)
        .then(resposne => {
          console.log('entrou no repsonse cardDetail ');
          this.cardInfo = resposne;
        })
        .catch(error => this.errorHandlerService.handle(error));

   }



  show(){
   // this.display = true;
  }

  add(){
    //this.display = false;
  }

}
