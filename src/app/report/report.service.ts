import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { BasicInfo } from './dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  urlReport: string; // = "http://localhost:8080/v1/product";



  constructor(
    private http: HttpClient
  ) {
    this.urlReport = `${environment.apiUrl}/v1/report`;
  }

  listTopSalesFood(period: any): Promise<any> {
    return this.http.post(`${this.urlReport}/reportTopSalesFoodByStoreAndDate`, period)
      .toPromise()
      .then(reponse => reponse);
  }

  listTopSalesDrink(period: any): Promise<any> {
    return this.http.post(`${this.urlReport}/reportTopSalesDrinkByStoreAndDate`, period)
      .toPromise()
      .then(reponse => reponse);
  }


  listTopSalesByStore(params: any): Promise<any> {
    return this.http.post(`${this.urlReport}/reportTopSalesByStore`, params)
      .toPromise()
      .then(reponse => reponse);
  }

  listBasicInfo(idStore: number): Promise<any>{
    return this.http.get(`${this.urlReport}/reportBasicInfo/store/${idStore}`)
      .toPromise()
      .then(response => response);
  }

}
