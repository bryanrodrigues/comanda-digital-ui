import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/card/card.service';
import { AuthService } from 'src/app/security/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  idStore = this.auth.jwtPayload.idStore;

  cards = [];
  foods = [];
  drinks = [];
  topSalesParams = {};
  basicInfo = new BasicInfo();

  chartFoods = [];
  chartDrinks = [];


  labelList = [

  ];

  dataFood = [];
  labelFood = [];
  dataDrink = [];
  labelDrink = [];
  dataF: {};
  dataD: {};
  firstDate: Date;
  secondDate: Date;

  constructor(
    private cardService: CardService,
    public auth: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.listAllOpenCards();
    this.listTopSalesFood();
    this.listTopSalesDrink();
    this.listBasicInfo();
    this.chartDataDrink();
    this.chartDataFood();
  }

  listAllOpenCards() {

    this.cardService.listAllOpenCards(this.idStore)
      .then(response => {
        this.cards = response;

      })
      .catch(error => this.errorHandlerService.handle(error));
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

  listBasicInfo() {
    this.reportService.listBasicInfo(this.idStore)
      .then(response => {
        this.basicInfo = response;

        if (this.basicInfo.qtPeople == null) {
          this.basicInfo.qtPeople = 0;
        }

        if (this.basicInfo.totBilling == null) {
          this.basicInfo.totBilling = 0;
        }


        console.log('Basic Info' + JSON.stringify(this.basicInfo));
      })
      .catch(error => this.errorHandlerService.handle(error));
  }



  chartDataFood() {

    this.topSalesParams = { 'idStore': this.idStore, 'type': 1, 'qtReg': 5 };
    this.reportService.listTopSalesByStore(this.topSalesParams)
      .then(response => {
        this.chartFoods = response;

        if (this.chartFoods.length >= 1) {
        this.chartFoods.forEach(element => {
          this.dataFood.push(element.qtSale);
          this.labelFood.push(element.name);
        });
        }else {
          this.dataFood.push(1);
          this.labelFood.push('');
        }


        this.dataF = {
          labels: this.labelFood,
          datasets: [
            {
              data: this.dataFood,
              backgroundColor: [
                "#9CCC65",
                "#36A2EB",
                "#FFCE56",
                "tomato",
                "#40E0D0",
              ],
              hoverBackgroundColor: [
                "#9CCC65",
                "#36A2EB",
                "#FFCE56",
                "tomato",
                "#40E0D0",
              ]
            }]
        };
      })
      .catch(error => this.errorHandlerService.handle(error));


  }

  chartDataDrink() {

    this.topSalesParams = { 'idStore': this.idStore, 'type': 2, 'qtReg': 5 };
    this.reportService.listTopSalesByStore(this.topSalesParams)
      .then(response => {
        this.chartDrinks = response;

        if (this.chartDrinks.length >= 1) {
          this.chartDrinks.forEach(element => {
            this.dataDrink.push(element.qtSale);
            this.labelDrink.push(element.name);
          });
        }else {
          this.dataDrink.push(1);
          this.labelDrink.push('');
        }
        this.dataD = {
          labels: this.labelDrink,
          datasets: [
            {
              data: this.dataDrink,
              backgroundColor: [
                "#9CCC65",
                "#36A2EB",
                "#FFCE56",
                "tomato",
                "#40E0D0",
              ],
              hoverBackgroundColor: [
                "#9CCC65",
                "#36A2EB",
                "#FFCE56",
                "tomato",
                "#40E0D0",
              ]
            }]
        };


      })
      .catch(error => this.errorHandlerService.handle(error));



  }

}

export class BasicInfo {

  qtOpenCards: number;
  qtPeople: number;
  qtProductCardKitchen: number;
  totBilling: number;

}
