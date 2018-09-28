import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UsersComponent } from './components/user/users/users.component';
import { ProductsComponent } from './components/product/products/products.component';
import { SuppliersComponent } from './components/supplier/suppliers/suppliers.component';
import { PurchaseordersComponent } from './components/purchaseorder/purchaseorders/purchaseorders.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    component: ProductsComponent
  },
  {
    path: 'suppliers',
    canActivate: [AuthGuard],
    component: SuppliersComponent
  },
  {
    path: 'purchaseorders',
    canActivate: [AuthGuard],
    component: PurchaseordersComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
