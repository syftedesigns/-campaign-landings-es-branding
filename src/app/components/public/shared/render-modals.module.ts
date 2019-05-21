import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorTextComponent } from './branding-modal/generator-text.component';
import { BrandingModalComponent } from './branding-modal/branding-modal.component';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  declarations: [
    BrandingModalComponent,
    GeneratorTextComponent,
    LoaderComponent
  ],
  exports: [
    BrandingModalComponent,
    GeneratorTextComponent,
    LoaderComponent
  ],
  entryComponents: [
    BrandingModalComponent,
    GeneratorTextComponent,
    LoaderComponent
  ]
})
export class RenderModalsModule { }
