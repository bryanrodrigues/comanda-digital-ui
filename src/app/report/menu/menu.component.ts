import { ProductFilter } from './../../product/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product/product.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/security/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  productFilter = new ProductFilter();


  cars = [];

  cols = [
  { field: 'name', header: 'Item' },
  { field: 'description', header: 'Descrição' },
  { field: 'value', header: 'Valor' }
  ];

  constructor(
    public auth: AuthService,
    private productService: ProductService,
    private errorhanderService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.listMenuByStore(this.route.snapshot.params['idStore']);
  }



  listMenuByStore(idStore : number){
    this.productFilter.idStore = idStore;
    this.productService.listMenu(this.productFilter)
      .then(response => {
        this.cars = response;
      })
      .catch(error => this.errorhanderService.handle(error) );
  }




}
