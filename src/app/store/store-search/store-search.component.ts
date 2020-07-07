import { Address } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/core/model';
import { ToastyService } from 'ng2-toasty';
import { StoreService } from '../store.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-store-search',
  templateUrl: './store-search.component.html',
  styleUrls: ['./store-search.component.css']
})
export class StoreSearchComponent implements OnInit {

  nome: string;

  msgs = [];

  stores2 = [];

  clonedStore: { [s: string]: Store; } = {};


  stores = [];


  constructor(

    private toasty: ToastyService,
    private storeService: StoreService,
    private errorHandlerService: ErrorHandlerService

  ) { }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.storeService.listAll()
    .then(response => {
      this.stores = response;
    });

  }

  find(){
    if(this.nome){
      this.storeService.findStoreByName(this.nome)
        .then(response => {
          this.stores = response;
        });
    }else{
      this.list();
    }
  }


  onRowEditInit(store: Store, address: Address) {
    this.clonedStore[store.idStore] = {...store};

  }

onRowEditSave(store: Store, address: Address) {
    delete this.clonedStore[store.idStore];

    this.storeService.update(store)
    .then( () => {
      this.toasty.success('Estabelecimento alterado com sucesso!');
      this.list();
    } )
    .catch(error => this.errorHandlerService.handle(error));

}

onRowEditCancel(store: Store, index: number) {
    this.stores[index] = this.clonedStore[store.idStore];
    delete this.clonedStore[store.idStore];
    this.toasty.warning('Estabelecimento não atualizado!');
}


disable(store: Store){
  this.storeService.disable(store)
  .then( () => {
    if(store.status == 1){
    this.toasty.success('Estabelecimento Desabilitado!');
    }else{
      this.toasty.success('Estabelecimento Habilitado!');
    }
    this.list();
  } )
  .catch(error => this.errorHandlerService.handle(error));
}


}
