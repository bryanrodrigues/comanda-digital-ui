import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card, ProductCard } from '../core/model';

export class CardFilter{

  idStore =     1;
  name:       string;
  tableNumber: number;
  beginDate: Date;
  endDate  : Date;
  idCard : number;
  idUser : number

}

@Injectable({
  providedIn: 'root'
})
export class CardService {

  urlCard: string;

  urlProductCard: string; // = "http://localhost:8080/v1/productCard";

  constructor(
    private http: HttpClient
  ) {
    this.urlCard = `${environment.apiUrl}/v1/card`;
    this.urlProductCard = `${environment.apiUrl}/v1/productCard`;
  }

  save(card: Card): Promise<Card>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${this.urlCard}/save`, card, {headers})
      .toPromise()
      .then(reponse=> reponse['content']);

  }

  listAllOpenCards(idStore: number): Promise<any>{

    return this.http.get(this.urlCard + '/listAllOpenCards/store/' + idStore)
      .toPromise()
      .then(response => response);
  }


  listAllClosedCards(idStore: number): Promise<any>{

    return this.http.get(this.urlCard + '/listAllOpenCards/store/'+ idStore)
      .toPromise()
      .then(response => response);
  }

  closeCard(card: Card): Promise<Card>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${this.urlCard}/closeCard`, card, {headers})
    .toPromise()
    .then(reponse=> reponse['content']);

  }

  cardDetail(idStore: number, idCard: number): Promise<any>{
    return this.http.get(this.urlCard + '/find/store/' + idStore +'/card/' + idCard)
      .toPromise()
      .then(response => response);
  }

  cardClientDetail(idCard: number): Promise<any>{
    return this.http.get(this.urlCard + '/find/card/' + idCard)
      .toPromise()
      .then(response => response);
  }


  findByTable(cardFilter: CardFilter): Promise<any>{
    return this.http.get(`${this.urlCard}/find/store/${cardFilter.idStore}/tableNumber/${cardFilter.tableNumber}`)
      .toPromise()
      .then(response => response);
  }

  openClientCard(idUser: number): Promise<any>{

    return this.http.get(this.urlCard + '/find/last/open/user/'+ idUser)
      .toPromise()
      .then(response => response);
  }

  listAllclosedCardByClient(idUser: number): Promise<any>{
    return this.http.get(this.urlCard + '/find/closed/user/'+ idUser)
      .toPromise()
      .then(response => response);
  }

  finClosedCardsByPeriod(period: any): Promise<any>{
    return this.http.post(`${this.urlCard}/find/closedCardsByStoreAndDate`, period)
    .toPromise()
    .then(reponse=> reponse);
  }

// productCard


  addProductCard(productCard: ProductCard): Promise<ProductCard>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${this.urlProductCard}/add/product`, productCard, {headers})
      .toPromise()
      .then(response => response['content']);

    }
  cardOpen(cardFilter: CardFilter): Promise<any>{

    return this.http.get(`${this.urlProductCard}/find/card/${cardFilter.idCard}`)
      .toPromise()
      .then(response => response);
  }

  editProductCard(productCard: ProductCard): Promise<ProductCard>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.urlProductCard}/update/product`, productCard, {headers})
    .toPromise()
    .then();
  }


}
