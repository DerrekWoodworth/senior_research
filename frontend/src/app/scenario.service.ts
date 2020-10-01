import { Injectable } from '@angular/core';
import { ScenariosClient } from './generated/ScenarioServiceClientPb';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthInterceptor } from './authinterceptor';
import { CreateScenarioRequest, CreateScenarioResponse, Scenario } from './generated/scenario_pb'

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {
  client: ScenariosClient

  constructor() {
    const authInterceptor = new AuthInterceptor()
    let options = {
      unaryInterceptors: [authInterceptor],
      streamInterceptors: [authInterceptor]
    }
    this.client = new ScenariosClient(environment.url, null, options)
  }

  addScenario(name, desc, code): Observable<Scenario> {
    console.log("Adding scenario in service")
    let scenario = new Scenario()
    scenario.setName(name)
    scenario.setDescription(desc)
    scenario.setInitcode("base64_name.tar")
    let req = new CreateScenarioRequest()
    req.setScenario(scenario)
    return new Observable((observer) => {
      this.client.create(req, null, (err, res) =>{
        console.log("Error ading scenario")
        console.log(err)
        observer.next(res.getScenario())
      })})
  }
}
