import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { SizeDevice } from 'src/app/classes/window.class';
import { DOCUMENT } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { CampaignService } from 'src/app/services/ads/campaign.service';
import { BrandingModalComponent } from '../shared/branding-modal/branding-modal.component';
import { NgForm } from '@angular/forms';
import { ParticleStyle, ParticleConfigMobile, ParticleConfigDesktop } from 'src/app/enviroments/particles.config';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.css', '../../../../ads.css']
})
export class BrandingComponent implements OnInit, OnDestroy {
  Device: SizeDevice;
  public ParticleStyle: object = {};
  public particles: object | any = {};
  public width: number = 100;
  public height: number = 100;
  constructor(@Inject(DOCUMENT) private document: Document,
  public dialog: MatDialog, private _adService: CampaignService) { }

  ngOnInit() {
    this.document.body.removeAttribute('class');
    this.document.body.classList.add('ads-theme-branding2');
    this.Device = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    if (this.Device.width <= 480) {
      this.ParticleStyle = ParticleStyle;
      this.particles = ParticleConfigMobile;
    } else {
      this.ParticleStyle = ParticleStyle;
      this.particles = ParticleConfigDesktop;
    }
  }
  ngOnDestroy() {
    this.document.body.removeAttribute('class');
  }

  OpenTrial(email: string = ''): void {
    // Limpiamos el body
    this.document.body.removeAttribute('class');
    // Desaparecemos el menu de la pagina para que no se muestre en el modal
    this._adService.showMenuCampaign = false;
    const dialogRef = this.dialog.open(BrandingModalComponent, {
      panelClass: ['dialog-resize-xl'],
      data: email,
      width: '100%',
      maxWidth: '100vw !important',
      minHeight: '100vh',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(
      () => {
        this.document.body.classList.add('ads-theme-branding2');
        this._adService.showMenuCampaign = true;
      }
    );
  }
  PrecreatedEmail(valueOf: NgForm): void {
    if (valueOf.invalid) {
      throw new Error('Form invalid');
    }
    console.log(valueOf.value);
    // Mandamos el email y abrimos el popup
    this.OpenTrial(valueOf.value.email);
  }
}
