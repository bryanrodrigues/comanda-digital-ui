import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { ProductCard } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  urlCard: string;

  urlProductCard: string; // = "http://localhost:8080/v1/productCard";

  constructor(
    private http: HttpClient
  ) {
    this.urlCard = `${environment.apiUrl}/v1/card`;
    this.urlProductCard = `${environment.apiUrl}/v1/productCard`;
  }


  listAllKitchenOrders(idStore: number): Promise<any>{

    return this.http.get(this.urlProductCard + '/listProductCardToKitchenByStore/store/id/' + idStore)
      .toPromise()
      .then(response => response);
  }

  updateStatus(productCard: ProductCard){

    return this.http.post(`${this.urlProductCard}/update/status`, productCard)
      .toPromise()
      .then(reponse=> reponse['content']);
  }

  rollBack(productCard: ProductCard){

    return this.http.post(`${this.urlProductCard}/update/status/rollBack`, productCard)
      .toPromise()
      .then(reponse=> reponse['content']);
  }

}
