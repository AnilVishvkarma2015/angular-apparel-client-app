import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppConfig } from '../app/config/app.config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './material.module';
import { AuthGuard } from './core/auth.guard';
import { JwtInterceptor } from './core/jwt.interceptor';

import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { UsersComponent } from './components/user/users/users.component';
import { ProductsComponent } from './components/product/products/products.component';
import { AddProductDialogComponent } from './components/product/add-product-dialog/add-product-dialog.component';
import { UpdateProductDialogComponent } from './components/product/update-product-dialog/update-product-dialog.component';
import { SuppliersComponent } from './components/supplier/suppliers/suppliers.component';
import { AddSupplierDialogComponent } from './components/supplier/add-supplier-dialog/add-supplier-dialog.component';
import { UpdateSupplierDialogComponent } from './components/supplier/update-supplier-dialog/update-supplier-dialog.component';
import { PurchaseordersComponent } from './components/purchaseorder/purchaseorders/purchaseorders.component';
import { UpdatePoDialogComponent } from './components/purchaseorder/update-po-dialog/update-po-dialog.component';
import { StocksComponent } from './components/stock/stocks/stocks.component';
import { UpdateStockDialogComponent } from './components/stock/update-stock-dialog/update-stock-dialog.component';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { SupplierService } from './services/supplier.service';
import { PurchaseorderService } from './services/purchaseorder.service';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { StockService } from './services/stock.service';
import { AddCustomerDialogComponent } from './components/customer/add-customer-dialog/add-customer-dialog.component';
import { CustomersComponent } from './components/customer/customers/customers.component';
import { SalesComponent } from './components/sale/sales/sales.component';
import { CreatePoComponent } from './components/purchaseorder/create-po/create-po.component';
import { DisplayPoItemsComponent } from './components/purchaseorder/display-po-items/display-po-items.component';
import { CreateSaleComponent } from './components/sale/create-sale/create-sale.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { ReportsComponent } from './components/report/reports/reports.component';
import { FeedbacksComponent } from './components/feedback/feedbacks/feedbacks.component';
import { AddFeedbackComponent } from './components/feedback/add-feedback/add-feedback.component';

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
    UpdatePoDialogComponent,
    StocksComponent,
    UpdateStockDialogComponent,
    AddCustomerDialogComponent,
    CustomersComponent,
    SalesComponent,
    CreatePoComponent,
    DisplayPoItemsComponent,
    CreateSaleComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserProfileComponent,
    ReportsComponent,
    FeedbacksComponent ,
    AddFeedbackComponent
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
    UpdatePoDialogComponent,
    UpdateStockDialogComponent,
    AddCustomerDialogComponent,
    DisplayPoItemsComponent,
    AddFeedbackComponent
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfig],
      multi: true
    },
    GlobalErrorHandlerService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    AuthGuard,
    AuthenticationService,
    ProductService,
    SupplierService,
    PurchaseorderService,
    UserService,
    StockService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
