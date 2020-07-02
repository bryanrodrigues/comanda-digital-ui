import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ProductRegistrationComponent } from './product-registration/product-registration.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';



@NgModule({
  declarations: [ProductRegistrationComponent, ProductSearchComponent],
  imports: [
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CurrencyMaskModule,
    FormsModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    DropdownModule

  ],
  exports: [ ProductRegistrationComponent, ProductSearchComponent ]
})
export class ProductModule { }
