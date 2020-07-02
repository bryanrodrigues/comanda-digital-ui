import { AuthService } from 'src/app/security/auth.service';
import { Product } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ToastyService } from 'ng2-toasty';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.css']
})
export class ProductRegistrationComponent implements OnInit {

  product = new Product();
  idStore = this.auth.jwtPayload.idStore;

  productTypes = [];

  constructor(
    private productService: ProductService,
    private toasty:         ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.listTypes();
  }

  save(form: NgForm){
    this.product.store.idStore = this.idStore;
    this.productService.save(this.product)
      .then( () => {
        this.product = new Product();
        this.toasty.success('Produto cadastrado com sucesso!');
        form.reset();
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  listTypes(){
    this.productService.listTypes()
      .then(response => {
        this.productTypes  = response.map( c =>  ({label: c.description, value: c.idProductType}));
      });
  }

}
