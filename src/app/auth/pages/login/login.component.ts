import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

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
    router: Router,
    private authService: AuthService
  ) {
    super(service, options, cd, router);
  }

  ngOnInit(): void {
  }

  toggleSeePassword() {
    this.seePassword = !this.seePassword;
  }

  login() {
    this.authService.checkValidLogin({
      email: this.user.email,
      password: this.user.password
    })
  }

}
