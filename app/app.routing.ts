import { Routes, RouterModule } from '@angular/router';

import AboutComponent from './about.component';
import SessionComponent from './session.component';
import StoreComponent from './store.component';


const appRoutes: Routes = [{
    path: 'join', component: SessionComponent, 
}, {
    path: 'about', component: AboutComponent,
}, {
    path: 'store', component: StoreComponent,
}, {
    path: '', pathMatch: 'full', redirectTo: 'about'
}];


export const routing = RouterModule.forRoot(appRoutes);