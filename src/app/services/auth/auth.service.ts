import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NbAuthService } from "@nebular/auth";
import { BehaviorSubject } from "rxjs";

interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serviceUrl: string;

  private readonly _isAuthenticated = new BehaviorSubject<boolean>(false);
  readonly isAuthenticated = this._isAuthenticated.asObservable();

  constructor(
    private http: HttpClient,
    private service: NbAuthService
  ) {
    this.serviceUrl = '/assets/data/credentials.json'
  }

  getLoginUsers(): any {
    return this.http.get(this.serviceUrl).toPromise()
  }

  async login(credentials: Credentials) {
    const { email, password } = credentials;
    const { users } = await this.getLoginUsers();
    const user = users.find(user => user.email === email && user.password === password)
    if (!user) {
      return Promise.reject(new Error('Userul sau parola este gresita!'))
    }

    const authSuccess = await this.service.authenticate('dummy', {
      email,
      password
    }).toPromise()

    return authSuccess
      ? Promise.resolve(authSuccess)
      : Promise.reject(new Error('A aparut o problema, te rugam incearca mai tarziu!'))
  }

  checkUserAuthentication() {
    this.service.isAuthenticated()
      .subscribe(isAuth => this._isAuthenticated.next(isAuth));
  }

  isUserLoggedIn() {
    return this.isAuthenticated
  }

}
