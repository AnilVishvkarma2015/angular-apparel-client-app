import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from '../app/config/app.config';
import { LoginComponent } from './components/user/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material.module';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/auth.guard';
import { JwtInterceptor } from './core/jwt.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UsersComponent } from './components/user/users/users.component';
import { ProductsComponent } from './components/product/products/products.component';
import { AddProductDialogComponent } from './components/product/add-product-dialog/add-product-dialog.component';
import { UpdateProductDialogComponent } from './components/product/update-product-dialog/update-product-dialog.component';
import { SuppliersComponent } from './components/supplier/suppliers/suppliers.component';
import { AddSupplierDialogComponent } from './components/supplier/add-supplier-dialog/add-supplier-dialog.component';
import { UpdateSupplierDialogComponent } from './components/supplier/update-supplier-dialog/update-supplier-dialog.component';
import { PurchaseordersComponent } from './components/purchaseorder/purchaseorders/purchaseorders.component';
import { AddPoDialogComponent } from './components/purchaseorder/add-po-dialog/add-po-dialog.component';
import { UpdatePoDialogComponent } from './components/purchaseorder/update-po-dialog/update-po-dialog.component';
import { SupplierService } from './services/supplier.service';
import { PurchaseorderService } from './services/purchaseorder.service';

export function initConfig(config: AppConfig) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    UsersComponent,
    ProductsComponent,
    AddProductDialogComponent,
    UpdateProductDialogComponent,
    SuppliersComponent,
    AddSupplierDialogComponent,
    UpdateSupplierDialogComponent,
    PurchaseordersComponent,
    AddPoDialogComponent,
    UpdatePoDialogComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  entryComponents: [
    AddProductDialogComponent,
    UpdateProductDialogComponent,
    AddSupplierDialogComponent,
    UpdateSupplierDialogComponent,
    AddPoDialogComponent,
    UpdatePoDialogComponent
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfig],
      multi: true
    },
    AuthGuard,
    AuthenticationService,
    ProductService,
    SupplierService,
    PurchaseorderService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
