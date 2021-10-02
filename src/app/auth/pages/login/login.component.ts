import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent {
  seePassword: boolean;

  constructor(
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    cd: ChangeDetectorRef,
    router: Router
  ) {
    super(service, options, cd, router);
  }

  ngOnInit(): void {
  }

  toggleSeePassword() {
    this.seePassword = !this.seePassword;
  }

  login() {
    this.service.authenticate('dummy', {
      email: this.user.email,
      password: this.user.password
    }).subscribe(data => {
      console.log("data: ", data)
    })
  }

}
