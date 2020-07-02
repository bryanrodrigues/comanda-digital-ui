import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {PasswordModule} from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

import { UserRegistrationComponent } from './user-registration/user-registration.component';
import {TooltipModule} from 'primeng/tooltip';
import { UserEditComponent } from './user-edit/user-edit.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {KeyFilterModule} from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    UserRegistrationComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    InputMaskModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    TooltipModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    KeyFilterModule,
    TableModule
  ],
  exports: [
    UserRegistrationComponent
  ],
  providers: [

  ]
})
export class UserModule { }
