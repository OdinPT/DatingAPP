import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { AppNavComponent } from './app-nav/app-nav.component';


@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      AppNavComponent
   ],
   imports: [
	 BrowserModule,
	 AppRoutingModule,
	 HttpClientModule
	],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
