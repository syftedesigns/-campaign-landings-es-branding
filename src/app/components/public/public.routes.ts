import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrandingComponent } from './branding/branding.component';


const routes: Routes = [
    {
        path: '',
        component: BrandingComponent,
        data: {Title: 'Empieza una marca increíble hoy! | Syftedesigns.com'}
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {}
