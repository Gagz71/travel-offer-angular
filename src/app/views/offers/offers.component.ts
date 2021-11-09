import {Component, OnDestroy, OnInit} from '@angular/core';
import {Offer} from "../../models/offer.model";
import {Subscription} from "rxjs";
import {OfferService} from "../../services/offer/offer.service";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit, OnDestroy {

	offersSubs: Subscription;
	offers : Array<Offer>;

	constructor(private offerService: OfferService) {
		this.offers = [];
		this.offersSubs = new Subscription();
	}

	ngOnInit(): void {
		//Stockage de la subscription pour pouvoir la supprimer quand le composant sera détruit
		this.offersSubs = this.offerService
			.offers
			//subscription pour l'écoute de toutes les nouvelles valeurs envoyés par la méthode .next() dans le service
		  	.subscribe(offers => {
			  	console.log(offers);
				  //updating variable offers pour update le template
			  	this.offers = offers;
		  	});
	}

	ngOnDestroy(): void{

		//unsubscribe la souscription
		this.offersSubs.unsubscribe();
	}

}
