import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Offer} from "../../models/offer.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

	offers: BehaviorSubject<Array<Offer>>;

	//Passer les service en param du constructeur pour pouvoir les utiliser
	constructor(private http: HttpClient, private authService: AuthService) {
		this.offers = new BehaviorSubject<Array<Offer>>([]);  //A écrire avant this.getOffers => pour éviter de l'écraser
		this.getOffers();
	}

	//Création fonction qui récupère les offres
	getOffers(): void{

		//Token ne peut être utiliser que dans un header :
		//Création d'un header pour pouvoir lui passer le token
		let  headers = new HttpHeaders();
		headers = headers.append('Authorization', this.authService.token.getValue());

		//httpClient retourne un observable -->  utiliser méthode toPromise() pour transformer l'observable en promesse
		this.http
			.get('https://angular-eval.herokuapp.com/api/v1/offers', {headers})
			//pipe transforme les data retourné par l'API
			.pipe(
				//map retourne un nouveau array avec les data transformés
				map((data: any) => data.offers.map((offerAsJSON: any) => Offer.fromJSON(offerAsJSON)))
			)
			.toPromise() //transforme l'observable en promesse
			.then((offers: Array<Offer>) =>{  //Ecoute de la promesse
				this.offers.next(offers);  //Affectation des data transformés dans les offres observables
				//methode .next => affect et emit à tout les composants qui observe la variable
			} );
	}

	getOfferById(id: string): Promise<Offer> {

		let  headers = new HttpHeaders();
		headers = headers.append('Authorization', this.authService.token.getValue());

		return this.http
			.get('https://angular-eval.herokuapp.com/api/v1/offers/'+id, {headers})

			.pipe(
				//map retourne un nouveau array avec les data transformés
				map((data: any) => Offer.fromJSON(data.offer))
			)
			.toPromise();


		// Solution with the cache

		// return new Promise<Offer>(
		//   (res, rej) => {
		//
		//     const offers = this.offers.getValue();
		//
		//     for (const offer of offers) {
		//       if (offer.id === id) {
		//         res(offer);
		//         break;
		//       }
		//     }
		//
		//   }
		// );
	}

	save(offer: Offer): Promise<any> {

		//Token ne peut être utiliser que dans un header :
		//Création d'un header pour pouvoir lui passer le token
		let  headers = new HttpHeaders();
		headers = headers.append('Authorization', this.authService.token.getValue());

		//Juste parce l'API n'ajoute pas vmt la valeur en bdd
		const offers = this.offers.getValue();
		offers.push(offer);
		this.offers.next(offers);

		return this.http
			.post('https://angular-eval.herokuapp.com/api/v1/offers/', offer.toJSON(), {headers})
			.toPromise();

	}

	update(offerEdited: Offer): Promise<any> {

		//Token ne peut être utiliser que dans un header :
		//Création d'un header pour pouvoir lui passer le token
		let  headers = new HttpHeaders();
		headers = headers.append('Authorization', this.authService.token.getValue());

		//Juste parce l'API n'ajoute pas vmt la valeur en bdd
		const offers = this.offers.getValue();

		for(const [index, offer] of offers.entries()){
			if(offer.id === offerEdited.id){
				offers[index] = offerEdited;
				this.offers.next(offers);
				break;
			}
		}

		return this.http
			.post('https://angular-eval.herokuapp.com/api/v1/offers/'+offerEdited.id, offerEdited.toJSON(), {headers})
			.toPromise();

	}


	delete(id: any) {

		//Token ne peut être utiliser que dans un header :
		//Création d'un header pour pouvoir lui passer le token
		let  headers = new HttpHeaders();
		headers = headers.append('Authorization', this.authService.token.getValue());

		//Juste parce l'API n'ajoute pas vmt la valeur en bdd
		const offers = this.offers.getValue();

		for(const [index, offer] of offers.entries()){
			if(offer.id === id){
				offers.splice(index, 1);
				this.offers.next(offers);
				break;
			}
		}

		return this.http
			.get('https://angular-eval.herokuapp.com/api/v1/offers/delete/'+id,{headers})
			.toPromise();
	}
}
