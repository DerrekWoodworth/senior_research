import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginClient } from './generated/login_pb_service';
import { LoginRequest } from './generated/login_pb';
import { environment } from  '../environments/environment';
// import { AuthInterceptor } from './authinterceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  client:  LoginClient

  constructor() { 
    console.log("URL: " + environment.url)
    const authInterceptor = new AuthInterceptor("testToken")
    //let options = {

    //unaryInterceptors: [authInterceptor],
    //streamInterceptors: [authInterceptor]
    //}

    this.client = new LoginClient(environment.url) //, null, options)
    }

    login(email,password): Observable<string> {
      return Observable.create((observer) => {
        const req = new LoginRequest();
        req.setEmail(email)
	req.setPassword(password)
	this.client.login(req, (err, res) => {
	  console.log("Got a response for logging in")
	  console.log(err)
	  console.log(res)
	  observer.next(res.getJwt())})})
	  
	  
    }
}
