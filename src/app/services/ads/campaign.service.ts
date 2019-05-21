import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { CampaignObject } from '../../classes/campaign/campaign.model';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  public showMenuCampaign: boolean = true;
  constructor(private _http: HttpClient, private snackBar: MatSnackBar) { }

  subscribeToCampaign(objectCampaign: CampaignObject, fileSendgrid: string) {
    const url = `../../../es/sendgrid/${fileSendgrid}.php`;
    const form = new FormData();
    form.append('NAME', objectCampaign.name);
    form.append('EMAIL', objectCampaign.email);
    form.append('CAMPAIGN', objectCampaign.campaign);
    form.append('SERVICE', objectCampaign.helper);
    return this._http.post(url, form).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! Tenemos problemas para procesar su información. Por favor inténtelo de nuevo', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
}
