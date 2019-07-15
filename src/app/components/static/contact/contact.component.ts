import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CampaignObject } from '../../../classes/campaign/campaign.model';
import { AuthService } from '../../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { CampaignService } from '../../../services/ads/campaign.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private auth: AuthService, private snackBar: MatSnackBar,
              private _service: CampaignService) { }

  ngOnInit() {
  }
  sendForm(form: NgForm): void {
    if (form.invalid) {
      throw new Error('Form invalid');
    }
    this.isLoading = true;
    const newsletter = new CampaignObject(form.value.name, form.value.email,
      'suscription', 'Branding', null, 'spanish');
    this.auth.RegisterNewAffiliation(newsletter, 'affiliation_track')
      .subscribe((data) => {
        if (data.status) {
          // Lo registro o afilio
          setTimeout(() => {
            this._service.subscribeToCampaign(newsletter, 'subscription') // Enviamos el mensaje
              .subscribe((msg) => {
                if (msg.status) {
                  // Envio el mensaje, lo notificamos
                  this.isLoading = false;
                  form.reset();
                  // tslint:disable-next-line:max-line-length
                  const Snack = this.snackBar.open('Gracias por suscribirte a Syfte, es hora de darle a tu negocio la potencia que necesitas!',
                  'Explorar más servicios', {
                    duration: 10000,
                  });
                  Snack.afterDismissed().subscribe(
                    (e) => {
                      if (e.dismissedByAction) {
                        location.href = 'https://www.syftedesigns.com/campaign/services/';
                      }
                      console.log(e);
                    }
                  );
                }
              });
          }, 500);
        } else {
          this.isLoading = false;
          form.reset();
          return;
        }
      });
  }
}
