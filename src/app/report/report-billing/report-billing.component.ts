import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-billing',
  templateUrl: './report-billing.component.html',
  styleUrls: ['./report-billing.component.css']
})
export class ReportBillingComponent implements OnInit {

  private idStore = this.auth.jwtPayload.idStore;
  annualBilling = [];
  annualBillingData : any;
  years = [];
  year = [];
  valueDrink = [];
  data: any;
  annualBillingParams = {};

  firstPeriod: Date;
  secondPeriod: Date;



  loadAnnualChart(annualBillingData : any){

    this.data = {
      labels: annualBillingData.month,
      datasets: [
        {
          label: 'Total(R$)',
          backgroundColor: '#FF6384',
          borderColor: '#7CB342',
          data: annualBillingData.totBilling
        },
        {
          label: 'Bebida(R$)',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: annualBillingData.totDrink
        },
        {
          label: 'Comida(R$)',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: annualBillingData.totFood
        }
      ]
    }


  }

  constructor(
    public auth: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private reportService: ReportService
  ) { }

  ngOnInit(): void {

    this.listAnnualBilling();

  }

  listAnnualBilling(){

    if(this.firstPeriod && this.secondPeriod){

      console.log(this.firstPeriod);

      console.log(this.secondPeriod);

    }
    this.annualBillingParams = { 'idStore': this.idStore, 'firstDate' : this.firstPeriod, 'secondDate' : this.secondPeriod };

    this.reportService.listAnnualBilling(this.annualBillingParams)
    .then(response => {
      this.annualBillingData = response;
      this.loadAnnualChart(this.annualBillingData);
      this.annualBilling = this.annualBillingData.details;
    })
    .catch(error => this.errorHandlerService.handle(error));

  }



}
