import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignService } from './ads/campaign.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  declarations: [],
  providers: [
    CampaignService,
    AuthService
  ]
})
export class ServicesModule { }
