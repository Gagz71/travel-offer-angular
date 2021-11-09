export class Offer{

	//commence par underscore pour éviter toutes confusions entre attributs et getter/setters(car getter-setter commencent par underscore) => bonnes pratiques
	private _id: string | null; //string car id nosql
	private _name: string;
	private _description: string;
	private _dateBegin: Date;
	private _dateEnd: Date;
	private _pictureUrl: string;
	private _createdAt: Date;
	private _updatedAt: Date;

	constructor( name: string, description: string, dateBegin: Date, dateEnd: Date, pictureUrl: string, createdAt: Date, updatedAt: Date, id?: string) {

		//Id optionnel
		if(typeof id === 'string'){
			this._id = id;
		} else{
			this._id = null;
		}


		this._name = name;
		this._description = description;
		this._dateBegin = dateBegin;
		this._dateEnd = dateEnd;
		this._pictureUrl = pictureUrl;
		this._createdAt = createdAt;
		this._updatedAt = updatedAt;
	}


	get id(): string | null {
		return this._id;
	}

	set id(value: string | null) {
		this._id = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get description(): string {
		return this._description;
	}

	set description(value: string) {
		this._description = value;
	}

	get dateBegin(): Date {
		return this._dateBegin;
	}

	set dateBegin(value: Date) {
		this._dateBegin = value;
	}

	get dateEnd(): Date {
		return this._dateEnd;
	}

	set dateEnd(value: Date) {
		this._dateEnd = value;
	}

	get pictureUrl(): string {
		return this._pictureUrl;
	}

	set pictureUrl(value: string) {
		this._pictureUrl = value;
	}

	get createdAt(): Date {
		return this._createdAt;
	}

	set createdAt(value: Date) {
		this._createdAt = value;
	}

	get updatedAt(): Date {
		return this._updatedAt;
	}

	set updatedAt(value: Date) {
		this._updatedAt = value;
	}

	static fromJSON(offerAsJSON: any): Offer {
		return new Offer(
			offerAsJSON.name,
			offerAsJSON.description,
			offerAsJSON.dateBegin,
			offerAsJSON.dateEnd,
			offerAsJSON.imgUrl,   //!!!car pictureUrl est ma variable et dans l'api c'est imgUrl
			offerAsJSON.createdAt,
			offerAsJSON.updatedAt,
			offerAsJSON._id
		);
	}

	toJSON(): any {
		return {
			_id: this.id,
			name: this.name,
			description: this.description,
			dateBegin: this.dateBegin,
			dateEnd: this.dateEnd,
			pictureUrl: this.pictureUrl,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		};
	}
}
