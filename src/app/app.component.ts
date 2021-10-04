import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'meowgram';
  isUserLoggedIn: boolean = false;
  loading: boolean = false;

  constructor(
    public nbAuthService: NbAuthService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.checkUserAuthentication();
    this.checkIsAuthenticated();
  }

  logout() {
    this.loading = true;
    this.nbAuthService.logout('dummy').subscribe(data => {
      this.loading = false;
      this.authService.checkUserAuthentication();
      this.router.navigate(['/login']);
    }, error => {
      this.loading = false;
    })
  }

  checkIsAuthenticated(): void {
    this.authService.isUserLoggedIn()
      .subscribe(userAuth => this.isUserLoggedIn = userAuth)
  }
}
