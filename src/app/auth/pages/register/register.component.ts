import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService, NbRegisterComponent, NB_AUTH_OPTIONS } from '@nebular/auth';

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
    router: Router
  ) {
    super(service, options, cd, router);
  }

  ngOnInit(): void {
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.register('dummy', this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      return this.router.navigate(['dashboard']);
    });
  }

}
