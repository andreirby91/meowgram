import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { NbAuthService, NbTokenLocalStorage } from "@nebular/auth";
import { Observable } from "rxjs";
// import users from './credentials';

interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serviceUrl: string;

  constructor(
    private http: HttpClient,
    private service: NbAuthService
  ) {
    this.serviceUrl = '/assets/data/credentials.json'
  }

  checkValidLogin(credentials: Credentials) {
    this.http.get(this.serviceUrl).subscribe(users => {
      console.log("users: ", users)
    })
  }

  login(credentials: Credentials) {
    const {email, password} = credentials;

    this.service.authenticate('dummy', {
      email,
      password
    }).subscribe(data => {
      const loginResp = new Observable(subscriber => {
        setTimeout(() => {
          subscriber.next(data);
          subscriber.complete();
        }, 1000);
      });

      return loginResp
    })
  }

}
