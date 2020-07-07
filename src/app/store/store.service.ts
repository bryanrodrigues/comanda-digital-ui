import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '../core/model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  urlStore: string; // = "http://localhost:8080/v1/store";

  urlAdress: string; // = "http://localhost:8080/v1/address/find/zipCode/";

  constructor(
    private http: HttpClient
    ) {

      this.urlStore = `${environment.apiUrl}/v1/store`;
      this.urlAdress = `${environment.apiUrl}/v1/address/find/zipCode/`;

    }


  save(store: Store): Promise<Store>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.urlStore}/save`, store, {headers})
      .toPromise()
      .then(response => response['content']);
  }

  findAddressByZipCode(cep: string): Promise<any>{
    return this.http.get(this.urlAdress + cep)
      .toPromise()
      .then(response => response);
  }

  update(store: Store): Promise<any>{
    return this.http.put(`${this.urlStore}/update`, store)
    .toPromise()
    .then(response => response['content']);
  }

  findStoreByName(name: string): Promise<any>{
    return this.http.get(`${this.urlStore}/find/name/${name}`)
      .toPromise()
      .then(response => response);
  }


  listAll(): Promise<any>{
    return this.http.get(`${this.urlStore}/listAll`)
      .toPromise()
      .then(response => response);
  }

  disable(store: Store){
    return this.http.put(`${this.urlStore}/enable/disable`, store)
    .toPromise()
    .then(response => response['content']);

  }

}
