import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  async canActivate() {
    const isAuthenticated = await this.authService.isAuthenticated().toPromise();
    return isAuthenticated ? this.router.navigate(['dashboard']) : true;
  }
}
