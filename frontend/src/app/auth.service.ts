import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginClient } from './generated/login_pb_service';
import { LoginRequest } from './generated/login_pb';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  client:  LoginClient

  constructor() { 
    this.client = new LoginClient('http://192.168.1.138:8082')
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
