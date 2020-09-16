import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-scenario',
  templateUrl: './add-scenario.component.html',
  styleUrls: ['./add-scenario.component.css']
})
export class AddScenarioComponent implements OnInit {
  form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
    })
  }

  ngOnInit(): void {

  }

  addScenario() {
    const val = this.form.value
    console.log("Creating new Scenario")
    console.log("Name: " + val.name)
    console.log("Description: " + val.description)
    console.log("Code: " + val.code)
  }

}
