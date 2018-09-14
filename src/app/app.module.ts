import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ProductsCrudOperations } from './components/product/products-crud-operations/products-crud-operations.component';
import { AddProductDialogComponent } from './components/product/add-product-dialog/add-product-dialog.component';
import { UpdateProductDialogComponent } from './components/product/update-product-dialog/update-product-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    UsersComponent,
    ProductsComponent,
    ProductsCrudOperations,
    AddProductDialogComponent,
    UpdateProductDialogComponent
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
    UpdateProductDialogComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    ProductService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
