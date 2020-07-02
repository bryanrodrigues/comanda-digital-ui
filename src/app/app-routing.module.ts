import { StoreSearchComponent } from './store/store-search/store-search.component';

import { CardAddComponent } from './card/card-add/card-add.component';
import { LoginFormComponent } from './security/login-form/login-form.component';
import { CardOpenComponent } from './card/card-open/card-open.component';
import { CardRegistrationComponent } from './card/card-registration/card-registration.component';
import { ProductSearchComponent } from './product/product-search/product-search.component';
import { ProductRegistrationComponent } from './product/product-registration/product-registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { StoreRegistrationComponent } from './store/store-registration/store-registration.component';
import { CardSearchComponent } from './card/card-search/card-search.component';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { CardClosedDetailComponent } from './card/card-closed-detail/card-closed-detail.component';
import { CardOpenClientComponent } from './card/card-open-client/card-open-client.component';
import { AccessDeniedComponent } from './core/access-denied/access-denied.component';
import { AuthGuard } from './security/auth.guard';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { KitchenOrdersComponent } from './kitchen/kitchen-orders/kitchen-orders.component';
import { ReportProductComponent } from './report/report-product/report-product.component';
import { DashboardComponent } from './report/dashboard/dashboard.component';
import { MenuComponent } from './report/menu/menu.component';


const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},

  { path: 'dashboard',
  component: DashboardComponent,
  canActivate:[AuthGuard],
  data:{roles: ['ROLE_ESTABELECIMENTO']}
},

  { path: 'usuario/novo',
    component: UserRegistrationComponent,
    canActivate:[AuthGuard],
    data:{roles: ['ROLE_ADM', 'ROLE_ESTABELECIMENTO']}
  },
  { path: 'loja/novo',
    component: StoreRegistrationComponent,
    canActivate:[AuthGuard],
    data:{roles: ['ROLE_ADM']}
  },
  { path: 'produtos/novo',
    component: ProductRegistrationComponent,
    canActivate:[AuthGuard],
    data:{roles: ['ROLE_ESTABELECIMENTO']}
  },
  { path: 'produtos',
    component: ProductSearchComponent,
    canActivate:[AuthGuard],
    data:{roles: ['ROLE_ESTABELECIMENTO']}
  },
  { path: 'comanda/novo',
    component: CardRegistrationComponent,
    canActivate:[AuthGuard],
    data:{roles: ['ROLE_ESTABELECIMENTO']}
  },
  { path: 'comandas/abertas',
    component: CardOpenComponent,
    canActivate:[AuthGuard],
    data:{roles: ['ROLE_ESTABELECIMENTO']}
  },
  { path: 'comanda/aberta/:idCard',
    component: CardAddComponent,
    canActivate:[AuthGuard],
    data:{roles: ['ROLE_ESTABELECIMENTO', 'ROLE_CLIENTE']}
  },
  { path: 'comanda/fechada/:idCard',
    component: CardClosedDetailComponent,
    canActivate:[AuthGuard],
    data:{roles: ['ROLE_ESTABELECIMENTO', 'ROLE_CLIENTE']}
  },
  { path: 'comandas/fechadas',
    component: CardSearchComponent,
    canActivate:[AuthGuard],
    data:{roles: ['ROLE_ESTABELECIMENTO']}
  },
  { path: 'inicio/cliente',
    component: CardOpenClientComponent,
    canActivate:[AuthGuard],
    data:{roles: ['ROLE_CLIENTE']}
  },
  { path: 'loja/pesquisar',
    component: StoreSearchComponent,
    canActivate:[AuthGuard],
    data:{roles: ['ROLE_ADM']}
  },

  { path: 'usuario/editar',
  component: UserEditComponent,
  canActivate:[AuthGuard],
  data:{roles: ['ROLE_ADM', 'ROLE_ESTABELECIMENTO', 'ROLE_CLIENTE']}
  },

  { path: 'cozinha',
  component: KitchenOrdersComponent,
  canActivate:[AuthGuard],
  data:{roles: ['ROLE_ESTABELECIMENTO']}
  },

  { path: 'relatorio/produtos',
  component: ReportProductComponent,
  canActivate:[AuthGuard],
  data:{roles: ['ROLE_ESTABELECIMENTO']}
  },

  { path: 'cardapio/:idStore',
  component: MenuComponent,
  canActivate:[AuthGuard]//,
  //data:{roles: ['ROLE_ESTABELECIMENTO']}
  },

  { path: 'pagina-nao-encontrada', component: PageNotFoundComponent },

  { path: 'acesso-negado', component: AccessDeniedComponent },

  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
