import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/core/model';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { ToastyService } from 'ng2-toasty';
import { StoreService } from '../store.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-store-registration',
  templateUrl: './store-registration.component.html',
  styleUrls: ['./store-registration.component.css']
})
export class StoreRegistrationComponent implements OnInit {

  users = [];

  cep: string = "";

  store = new Store();

  constructor(
    private userService: UserService,
    private storeSevice: StoreService,
    private toasty:      ToastyService,
    private erroHandlerService: ErrorHandlerService
    ) { }

  ngOnInit(): void {
    this.listUsers();
  }

  save(form: NgForm){

    this.storeSevice.save(this.store)
      .then( () =>{
       form.reset();
       this.store = new Store();
       this.toasty.success("Estabelecimento cadastrado com sucesso!");
      })
      .catch(error => {
        this.erroHandlerService.handle(error);
      });
  }

  listUsers(){
    return this.userService.listAll()
      .then(users => {
        this.users = users.map( c =>  ({label: c.name, value: c.idUser}));
      });
  }

  findAddressByZipCode(){
    console.log('entrou');
    if(this.cep !== ""){
      this.storeSevice.findAddressByZipCode(this.cep)
        .then(response => {
          this.store.address = response;
          if(!this.store.address.cep){
            this.toasty.error("CEP Inválido");
          }
        })
    }else{
      console.log('cep nulo ' );
    }

  }

}
