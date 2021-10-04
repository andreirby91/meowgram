import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService, NbRegisterComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent {

  constructor(
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    cd: ChangeDetectorRef,
    router: Router,
    private authService: AuthService,
    private toastrService: NbToastrService
  ) {
    super(service, options, cd, router);
  }

  ngOnInit(): void {
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    if(this.user.password != this.user.rePass) {
      return
    }

    this.service.register('dummy', this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      this.authService.checkUserAuthentication();
      window.location.href = '/dashboard';

    }, error => {
      this.submitted = false;
      this.toastrService.danger(error, 'Logare nereusita!')
    });
  }

}
