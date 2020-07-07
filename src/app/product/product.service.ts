

import { Product } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

export class ProductFilter{
  name: string;
  idStore: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlProduct: string; // = "http://localhost:8080/v1/product";

  urlProductType: string; // = "http://localhost:8080/v1/product";

  constructor(
    private http: HttpClient
    ) {
      this.urlProduct = `${environment.apiUrl}/v1/product`;

      this.urlProductType = `${environment.apiUrl}/v1/productType`;
    }


  save(product: Product): Promise<Product>{
   // const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${this.urlProduct}/save`, product)
      .toPromise()
      .then(reponse=> reponse['content']);
  }

  find(filter: ProductFilter): Promise<any>{

    return this.http.get(`${this.urlProduct}/find/name/${filter.name}/store/${filter.idStore}`)
      .toPromise()
      .then(response => response);
  }

  list(filter: ProductFilter): Promise<any>{
    return this.http.get(`${this.urlProduct}/find/store/${filter.idStore}`,)
    .toPromise()
    .then(response => response);
  }

  listMenu(filter: ProductFilter): Promise<any>{
    const headers = new HttpHeaders().set('Authorization' , '');

    return this.http.get(`${this.urlProduct}/menu/find/store/${filter.idStore}`, {headers})
    .toPromise()
    .then(response => response);
  }

  listTypes(): Promise<any>{
    return this.http.get(`${this.urlProductType}/listAll`)
    .toPromise()
    .then(response => response);
  }

  disable(product: Product): Promise<Product>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.urlProduct}/disable`, product, {headers})
      .toPromise()
      .then(reponse=> reponse['content']);
  }

  update(product: Product): Promise<Product>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.urlProduct}/update`, product, {headers})
      .toPromise()
      .then(reponse=> reponse['content']);
  }



}
