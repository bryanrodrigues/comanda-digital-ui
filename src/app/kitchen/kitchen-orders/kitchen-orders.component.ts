import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/security/auth.service';
import { KitchenService } from '../kitchen.service';
import { ProductCard } from 'src/app/core/model';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-kitchen-orders',
  templateUrl: './kitchen-orders.component.html',
  styleUrls: ['./kitchen-orders.component.css']

})
export class KitchenOrdersComponent implements OnInit {

  productsCard = [];
  idStore = this.auth.jwtPayload.idStore;
  private updateSubscription: Subscription;

  constructor(
    private kitchenService: KitchenService,
    private toasty: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.listAllKitchenOrders();
    this.updateSubscription = interval(5000).subscribe(
      (val) => { this.listAllKitchenOrders();  } );

  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }


  listAllKitchenOrders(){
    this.kitchenService.listAllKitchenOrders(this.idStore)
      .then(response => {
        console.log('produtos: ' + JSON.stringify(response));
        this.productsCard = response;
      })
      .catch(error => {
        this.errorHandlerService.handle(error);
      });
  }

  updateStatus(productCard: ProductCard){
    this.kitchenService.updateStatus(productCard)
      .then( () => {
        this.listAllKitchenOrders();
        this.toasty.success('Status atualizado!');
      })
      .catch(error => {
        this.errorHandlerService.handle(error);
      });
  }

  rollBack(productCard: ProductCard){
    this.kitchenService.rollBack(productCard)
      .then( () => {
        this.listAllKitchenOrders();
        this.toasty.success('Status atualizado!');
      })
      .catch(error => {
        this.errorHandlerService.handle(error);
      });
  }

}
