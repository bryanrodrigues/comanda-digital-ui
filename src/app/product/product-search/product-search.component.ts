import { AuthService } from 'src/app/security/auth.service';
import { ToastyService } from 'ng2-toasty';
import { Product } from './../../core/model';

import { ProductFilter, ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
  providers: [MessageService]
})
export class ProductSearchComponent implements OnInit {

  products2: Product[];
  msgs = [];
  clonedProducts: { [s: string]: Product; } = {};
  idStore = this.auth.jwtPayload.idStore;

  productTypes = [];
  products = [];

  filter = new ProductFilter();


  constructor(
    private productService: ProductService,
    private toasty: ToastyService,
    private auth: AuthService,
    private errorHandlerService: ErrorHandlerService

    )
   { }

  ngOnInit(): void {
    this.list();
    this.listTypes();

  }

  find(){
    if(this.filter.name){
      this.filter.idStore = this.idStore;
      this.productService.find(this.filter)
      .then(response => {
        this.products = response;

      })
      .catch(error => this.errorHandlerService.handle(error));
    }else{
      this.list();
    }
  }

  list(){
    this.filter.idStore = this.idStore;
    this.productService.list(this.filter)
    .then(response => {
      this.products = response;
    })
    .catch(error => this.errorHandlerService.handle(error));
  }

  update(product: Product){
    this.productService.update(product)
      .then( () => {
        this.toasty.success('Produto alterado com sucesso!');
        this.list();
      } )
      .catch(error => this.errorHandlerService.handle(error));
  }

  disable(product: Product){

    this.productService.disable(product)
      .then( () => {
        this.toasty.success('Produto deletado com sucesso!');
        this.list();
      } )
      .catch(error => this.errorHandlerService.handle(error));

  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.idProduct] = {...product};
}

onRowEditSave(product: Product) {
    if (product.value > 0) {

      delete this.clonedProducts[product.idProduct];

        // tslint:disable-next-line: align
        this.productService.update(product)
        .then( () => {
          this.toasty.success('Produto alterado com sucesso!');
          this.list();
        } )
        .catch(error => this.errorHandlerService.handle(error));
    }
    else {
      this.toasty.warning('Valor do produto não pode ser negativo!')
    }
}

onRowEditCancel(product: Product, index: number) {
    this.products[index] = this.clonedProducts[product.idProduct];
    delete this.clonedProducts[product.idProduct];
    this.toasty.warning('Produto não atualizado!');
}

listTypes(){
  this.productService.listTypes()
    .then(response => {
      this.productTypes  = response.map( c =>  ({label: c.description, value: c.idProductType}));
    });
}




}
