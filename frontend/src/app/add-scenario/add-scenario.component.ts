import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Scenario } from '../generated/scenario_pb';
import { ScenarioService } from '../scenario.service';
import { FileService } from '../file.service';

@Component({
  selector: 'app-add-scenario',
  templateUrl: './add-scenario.component.html',
  styleUrls: ['./add-scenario.component.css']
})
export class AddScenarioComponent implements OnInit {
  form: FormGroup
  scenarios: Scenario[]
  currentInput: File

  constructor(private fb: FormBuilder, 
    private scenarioService: ScenarioService,
    private fileService: FileService) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.scenarios = []
  }

  ngOnInit(): void {

  }
  onFileSelected(event) {
    console.log("Added file")
    this.currentInput = (event.target as HTMLInputElement).files[0]
  }

  addScenario() {
    const val = this.form.value
    console.log("Creating new Scenario")
    console.log("Name: " + val.name)
    console.log("Description: " + val.description)
    console.log("FILE : "  + this.currentInput)

    this.fileService.uploadFile(this.currentInput)

    this.scenarioService.addScenario(val.name, val.description, "").subscribe((response: Scenario) => {
      console.log("Got response back with GUID: " + response.getGuid())
      this.scenarios.push(response)
    })
    
  }

}
