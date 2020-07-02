import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRegistrationComponent } from './store-registration/store-registration.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { StoreSearchComponent } from './store-search/store-search.component';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [StoreRegistrationComponent, StoreSearchComponent],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    FormsModule,
    TableModule

  ],
  exports: [ StoreRegistrationComponent ]
})
export class StoreModule { }
