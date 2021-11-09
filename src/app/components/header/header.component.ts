import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

	token: string;
	tokenSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {
	  this.token='';
	  this.tokenSub = new Subscription();
  }

  ngOnInit(): void {
	  this.tokenSub = this.authService
		  .token
		  .subscribe((token: string)=> this.token = token);
  }

	onClickLogout(): void {
		this.authService
			.logout()
			.then(() => {
				this.router.navigateByUrl('');
			});
	}

  ngOnDestroy() {
	  this.tokenSub.unsubscribe();
  }


}
