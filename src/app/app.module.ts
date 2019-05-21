import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PublicComponent } from './components/public/public.component';
import { RouterModule } from '@angular/router';
import { StaticModule } from './components/static/static.module';
import { NgwWowModule } from 'ngx-wow';
import { SYFTE_ROUTES } from './app.routes';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    StaticModule,
    NgwWowModule,
    SYFTE_ROUTES,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
