import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./views/login/login.component";
import {OffersComponent} from "./views/offers/offers.component";
import {SingleOfferComponent} from "./views/single-offer/single-offer.component";
import {ErrorComponent} from "./views/error/error.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {EditOfferComponent} from "./views/edit-offer/edit-offer.component";
import {AddOfferComponent} from "./views/add-offer/add-offer.component";

const routes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'offers', canActivate: [AuthGuard],component: OffersComponent},
	{path: 'offers/add', canActivate: [AuthGuard],component: AddOfferComponent},
	//route avec : toujours en dessous => sans : juste avec / toujours en haut
	{path: 'offers/:id', canActivate: [AuthGuard],component: SingleOfferComponent},
	{path: 'offers/:id/edit', canActivate: [AuthGuard],component: EditOfferComponent},
	{path: 'not-found', component: ErrorComponent},
	{path: '**', redirectTo: 'not-found'} //Joker ** = si tu trouves aucun chemin -> tu me redirige sur la vue not-found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
