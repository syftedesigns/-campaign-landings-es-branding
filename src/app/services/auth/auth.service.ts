import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { CampaignObject } from '../../classes/campaign/campaign.model';
import { SYFTE_API } from 'src/app/enviroments/API.config';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { DiscountObject } from '../../classes/campaign/discount.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public DiscountBonus: DiscountObject = null;
  constructor(private _http: HttpClient, private snackBar: MatSnackBar) { }
// Registrar o actualizar un nuevo usuario de Syfte
  RegisterNewAffiliation(objectCampaign: CampaignObject, operationType: string, discount?: DiscountObject) {
    const url = `${SYFTE_API}/affiliation.php?operationType=${operationType}`;
    const form = new FormData();
    form.append('NAME', objectCampaign.name);
    form.append('EMAIL', objectCampaign.email);
    form.append('CAMPAIGN', objectCampaign.campaign);
    form.append('SERVICE', objectCampaign.helper);
    // Si existe un descuento lo agregamos
    if (discount) {
      form.append('DISCOUNT', JSON.stringify(discount));
    }
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
