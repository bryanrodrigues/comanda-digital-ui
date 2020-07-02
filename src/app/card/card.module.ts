import { RouterModule } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CardSearchComponent } from './card-search/card-search.component';
import { CardOpenComponent } from './card-open/card-open.component';
import { CardAddComponent } from './card-add/card-add.component';
import {SpinnerModule} from 'primeng/spinner';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import { CardRegistrationComponent } from './card-registration/card-registration.component';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CardClosedDetailComponent } from './card-closed-detail/card-closed-detail.component';
import { CardOpenClientComponent } from './card-open-client/card-open-client.component';
import {KeyFilterModule} from 'primeng/keyfilter';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [CardSearchComponent, CardOpenComponent, CardAddComponent,  CardRegistrationComponent, CardClosedDetailComponent, CardOpenClientComponent],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    SpinnerModule,
    FormsModule,
    PanelModule,
    DialogModule,
    InputMaskModule,
    DropdownModule,
    RouterModule,
    CurrencyMaskModule,
    KeyFilterModule,
    MessagesModule,
    MessageModule,
    InputTextareaModule

  ],
  // tslint:disable-next-line: max-line-length
  exports: [CardSearchComponent, CardOpenComponent, CardAddComponent, CardRegistrationComponent, CardClosedDetailComponent, CardOpenClientComponent]
})
export class CardModule { }
