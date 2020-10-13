import { Component, OnInit } from '@angular/core';
import { ScenarioService } from '../../scenario.service';
import { Scenario } from '../../generated/scenario_pb';
import { ContainerService } from '../../container.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  scenarios: Scenario[]

  constructor(private scenarioService: ScenarioService,
    private containerService: ContainerService) { }

  ngOnInit(): void {
    this.scenarioService.listScenarios().subscribe(data => this.scenarios = data)
  }

  launch(scenario: Scenario) {
    console.log("Launching scenario")
    console.log(scenario)

    this.containerService.createContainer(scenario.getName(), "derrek").subscribe(res => console.log(res))
  }

}
