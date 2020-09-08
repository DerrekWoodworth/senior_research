import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FromGroup

  constructor(private fb: FormBuilder) { 
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
  }

}
