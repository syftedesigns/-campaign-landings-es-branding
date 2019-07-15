import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatBottomSheet } from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { CampaignObject } from 'src/app/classes/campaign/campaign.model';
import { GeneratorTextComponent } from './generator-text.component';
import { LoaderComponent } from '../loader/loader.component';
import { CampaignService } from 'src/app/services/ads/campaign.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-branding-modal',
  templateUrl: './branding-modal.component.html',
  styleUrls: ['./branding-modal.component.css']
})
export class BrandingModalComponent implements OnInit {
  public emailDef: string = '';
  public textConsult: string = '';
  public campaignType: string = 'Ads Branding';
constructor(public dialogRef: MatDialogRef<BrandingModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: string,
  @Inject(DOCUMENT) private document: Document,
  private bottomSheet: MatBottomSheet,
  private dialog: MatDialog, private _matSnack: MatSnackBar,
  private _service: CampaignService, private _auth: AuthService) {
    if (data && data !== '') {
      this.emailDef = data;
      return;
    }
  }

ngOnInit() {
}
closeModal() {
  setTimeout(() => {
    this.dialogRef.close();
  }, 100);
}
generateTextSheet() {
  const defaultTextComponent = this.bottomSheet.open(GeneratorTextComponent);
  defaultTextComponent.afterDismissed().subscribe(
    (textGenerated) => {
      if (textGenerated) {
        this.textConsult = textGenerated;
      }
    }
  );
}
async sendCampaignMarketing(CampaignTicket: NgForm) {
  if (CampaignTicket.invalid) {
    throw new Error('The form is invalid');
  }
  const ObjectCampaign: CampaignObject = new CampaignObject(CampaignTicket.value.name,
    CampaignTicket.value.email, CampaignTicket.value.message, CampaignTicket.value.campaign_type);
  // Registramos al usuario
    const Register: CampaignObject = await this.SyfteAffiliationFunction(ObjectCampaign);
    // Si funciona el registro entonces mandamos el email
    if (Register !== null) {
      const loader = this.dialog.open(LoaderComponent, {
      data: ObjectCampaign,
      disableClose: true
    });
    loader.afterClosed().subscribe(
      async (campaignAfiliated: boolean) => {
        if ((campaignAfiliated)) {
          // Enviamos un email
          setTimeout(async () => {
            const Welcome: boolean = await this.SendWelcomeMessage(ObjectCampaign);
            if (Welcome) {
              console.log('Envió la bienvenida');
            } else {
              console.error('No pudo enviar la bienvenida');
            }
          }, 500);
            // Significa que ya registro y envio el email a Syfte, entonces le damos una bienvenida al cliente
           this._matSnack.open('Gracias por confiar en nosotros, nos pondremos en contacto con usted pronto.', null, {
             duration: 5000,
             panelClass: ['success-snackbar']
           });
           CampaignTicket.reset();
           this.dialogRef.close();
        } else {
          this._matSnack.open('Error al procesar su información, inténtelo de nuevo más tarde.', null, {
            duration: 5000,
            panelClass: ['red-snackbar']
          });
          CampaignTicket.reset();
          this.dialogRef.close();
        }
      }
    );
  }
}
// Función que devuelve la bienvenida al usuario
SendWelcomeMessage(affiliation: CampaignObject): Promise<boolean> {
  return new Promise((resolve, reject) => {
    this._service.subscribeToCampaign(affiliation, 'welcome')
      .subscribe(WelcomeMSG => {
        console.log(WelcomeMSG);
        if (WelcomeMSG.status) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
 }
 /*
 UPDATE
 Registrar nuevo usuario o actualizarlo cada vez que se afilia con nuestros formularios
 */
SyfteAffiliationFunction(object: CampaignObject): Promise<CampaignObject> {
  return new Promise((resolve, reject) => {
    // Verificamos si esta hay descuento o no, para el registro de la afiliación
    if (this._auth.DiscountBonus !== null) {
      // Hay descuento
      this._auth.RegisterNewAffiliation(object, 'affiliation_discount', this._auth.DiscountBonus)
        .subscribe((Affiliation) => {
          if (Affiliation.status) {
            resolve(Affiliation.data);
          } else {
            resolve(null);
          }
        });
    } else {
      // Afiliación sin descuento
      this._auth.RegisterNewAffiliation(object, 'affiliation_track')
        .subscribe((Affiliation) => {
          if (Affiliation.status) {
            resolve(Affiliation.data);
          } else {
            resolve(null);
          }
        });
    }
    // this._auth.RegisterNewAffiliation()
  });
 }
}
