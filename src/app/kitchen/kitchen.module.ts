import { TooltipModule } from 'primeng/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitchenOrdersComponent } from './kitchen-orders/kitchen-orders.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [KitchenOrdersComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule
  ],
  exports: [KitchenOrdersComponent]
})
export class KitchenModule { }
