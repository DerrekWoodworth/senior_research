import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginClient } from './generated/LoginServiceClientPb';
import { LoginRequest } from './generated/login_pb';
import { environment } from '../environments/environment';
import { AuthInterceptor } from './authinterceptor';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  client: LoginClient

  constructor(private router: Router) {
    const authInterceptor = new AuthInterceptor()
    let options = {

      unaryInterceptors: [authInterceptor],
      streamInterceptors: [authInterceptor]
    }

    this.client = new LoginClient(environment.url, null, options)
  }

  login(email, password): Observable<boolean> {
    return new Observable((observer) => {
      const req = new LoginRequest();
      req.setEmail(email)
      req.setPassword(password)

      this.client.login(req, null, (err, res) => {
        console.log("Got response " + res.getJwt())
        if (res.getJwt() != "") {
          console.log('Storing jwt : ' + res.getJwt())
          localStorage.setItem('jwt', res.getJwt())
          // Redirect to the correct home page
          let role = this.getRole()
          if (role == 'student') {
            this.router.navigate(['student-home'])
          } else {
            this.router.navigate(['professor-home'])
          }
          observer.next(true)
        } else {
          console.log("Did not successfully Authenticate")
          observer.next(false)
        }

      })
    })
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('jwt') != null
  }
  getRole(): string {
    const userJwt = localStorage.getItem('jwt')
    console.log("User's role : " + jwt_decode(userJwt).role)
    if (userJwt) {
      return jwt_decode(userJwt).role;
    } else {
      return null
    }
    //return jwt_decode(localStorage.getItem('jwt')).role;

  }
}
