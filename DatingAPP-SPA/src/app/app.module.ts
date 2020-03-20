import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AuthService } from 'src/_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from 'src/_services/error.interceptor';


@NgModule({
   declarations: [
      AppComponent,
      AppNavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
	 BrowserModule,
	 AppRoutingModule,
	 HttpClientModule,
	 FormsModule
	],
   providers: [
      AuthService,
      ErrorInterceptorProvider
   ],
   bootstrap: [AppComponent] 
})
export class AppModule { }
