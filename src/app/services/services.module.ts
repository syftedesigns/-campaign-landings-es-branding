import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignService } from './ads/campaign.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  declarations: [],
  providers: [
    CampaignService
  ]
})
export class ServicesModule { }
