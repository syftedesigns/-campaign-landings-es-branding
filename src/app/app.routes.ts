import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PublicComponent } from './components/public/public.component';

const routes: Routes = [
    {
        path: '',
        component: PublicComponent,
        loadChildren: './components/public/public.module#PublicModule'
    },
    /*{
        path: '**',
        component: PublicComponent
    }*/
];

export const SYFTE_ROUTES = RouterModule.forRoot(routes, {
    useHash: false,
    preloadingStrategy: PreloadAllModules
});
