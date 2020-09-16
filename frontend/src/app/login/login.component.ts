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
    this.authService.login(val.email,val.password).subscribe((res) => {
      // This is the boolean returned if it is false handle displaying false info
      })
  }

}
