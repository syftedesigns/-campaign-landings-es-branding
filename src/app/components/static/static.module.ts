import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAdsComponent } from './ads/menu-ads/menu-ads.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ],
  declarations: [
    MenuAdsComponent
  ],
  exports: [
    MenuAdsComponent
  ],
  entryComponents: [
    MenuAdsComponent
  ]
})
export class StaticModule { }
