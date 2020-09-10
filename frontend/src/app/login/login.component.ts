import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup
  
  constructor(private fb: FormBuilder, private authService: AuthService) { 
  this.form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required] });
  }  

  ngOnInit(): void {
  }

  login() {
    const val = this.form.value;
    console.log(val)
    console.log("Clicked log in")
    this.authService.login(val.email,val.password).subscribe((res) => {
      console.log("Response")
      console.log(res)
      })
  }

}
