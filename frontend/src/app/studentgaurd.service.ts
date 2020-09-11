import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentgaurdService implements CanActivate {

  constructor(private auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      // Send them to the log on screen
      console.log("Need to authenticate")
      this.router.navigate([''])
      return false
    }
    if(this.auth.getRole() == route.data.expectedRole) {
      console.log("You have the correct role")
      return true
    }
    console.log("Does not have the correct role")
    return false
  }
}
