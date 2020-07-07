import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/card/card.service';
import { AuthService } from 'src/app/security/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-product',
  templateUrl: './report-product.component.html',
  styleUrls: ['./report-product.component.css']
})
export class ReportProductComponent implements OnInit {

  private idStore = this.auth.jwtPayload.idStore;

  foods = [];
  drinks = [];
  topSalesParams = {};
  msgs = [];
  validDrink: Boolean;
  validFood: Boolean;

  firstDate: Date;
  secondDate: Date;

  constructor(
    public auth: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private reportService: ReportService
  ) {

   }

  ngOnInit(): void {
    this.listTopSalesFood();
    this.listTopSalesDrink();
  }

  listTopSalesFood() {
    this.topSalesParams = { 'idStore': this.idStore, 'firstDate': this.firstDate, 'secondDate': this.secondDate, 'type': 1 };
    this.reportService.listTopSalesByStore(this.topSalesParams)
      .then(response => {
        this.foods = response;
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  listTopSalesDrink() {
    this.topSalesParams = { 'idStore': this.idStore, 'firstDate': this.firstDate, 'secondDate': this.secondDate, 'type': 2 };
    this.reportService.listTopSalesByStore(this.topSalesParams)
      .then(response => {
        this.drinks = response;
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

    validateDateDrink(){
    if(this.firstDate > this.secondDate){

      this.msgs.push({severity:'warn', summary:'Opa!', detail:'A data inicial não pode ser maior que a data final!'});

      this.validDrink = true;
    }else{
      this.msgs = [];
      this.validDrink = false;
    }
  }

  validateDateFood(){
    if(this.firstDate > this.secondDate){

      this.msgs.push({severity:'warn', summary:'Opa!', detail:'A data inicial não pode ser maior que a data final!'});

      this.validFood = true;
    }else{
      this.msgs = [];
      this.validFood = false;
    }
  }























  /*
  cars = [{ "vin": "a1653d4d",  "year": 1998, "color": "White", "brand": "VW", "price": 10000 },

          { "vin": "ddeb9b10", "brand": "Mercedes", "year": 1985, "color": "Green", "price": 25000 }];


  cols = [
    { field: 'vin', header: 'Vin' },
    { field: 'year', header: 'Year' },
    { field: 'brand', header: 'Brand' },
    { field: 'color', header: 'Color' }
  ];

*/


}
