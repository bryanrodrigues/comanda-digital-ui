import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportProductComponent } from './report-product/report-product.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {ChartModule} from 'primeng/chart';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [ReportProductComponent, DashboardComponent, MenuComponent],
  imports: [
    CommonModule,
    CurrencyMaskModule,
    TableModule,
    FormsModule,
    ChartModule,
    CardModule,
    ButtonModule,
    RouterModule,
    CalendarModule,
    MessagesModule,
    MessageModule
  ],
  exports: [ReportProductComponent]
})
export class ReportModule { }
