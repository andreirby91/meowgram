import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent {
  seePassword: boolean;
  loading: boolean = false;

  constructor(
    service: NbAuthService,
    private toastrService: NbToastrService,
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

  async login() {
    this.loading = true;

    this.authService.login({
      email: this.user.email,
      password: this.user.password
    }).then(() => {
      this.authService.checkUserAuthentication();
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }, error => {
      this.toastrService.danger(error, 'Logare nereusita!')
      this.loading = false;
    })
  }

}
