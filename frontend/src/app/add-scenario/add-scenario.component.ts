import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Scenario } from '../generated/scenario_pb';
import { ScenarioService } from '../scenario.service';

@Component({
  selector: 'app-add-scenario',
  templateUrl: './add-scenario.component.html',
  styleUrls: ['./add-scenario.component.css']
})
export class AddScenarioComponent implements OnInit {
  form: FormGroup
  scenarios: Scenario[]

  constructor(private fb: FormBuilder, private scenarioService: ScenarioService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
    })
    this.scenarios = []
  }

  ngOnInit(): void {

  }

  addScenario() {
    const val = this.form.value
    console.log("Creating new Scenario")
    console.log("Name: " + val.name)
    console.log("Description: " + val.description)
    console.log("Code: " + val.code)
    
    this.scenarioService.addScenario(val.name, val.description, val.code).subscribe((response: Scenario) => {
      console.log("Got response back with GUID: " + response.getGuid())
      this.scenarios.push(response)
    })
    
  }

}
