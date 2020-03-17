import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AuthService } from 'src/_services/auth.service';


@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      AppNavComponent
   ],
   imports: [
	 BrowserModule,
	 AppRoutingModule,
    HttpClientModule ,
    FormsModule
	],
   providers: [
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
