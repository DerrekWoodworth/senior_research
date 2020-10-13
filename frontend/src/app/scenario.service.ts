import { Injectable } from '@angular/core';
import { ScenariosClient } from './generated/ScenarioServiceClientPb';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthInterceptor } from './authinterceptor';
import { CreateScenarioRequest, CreateScenarioResponse, ListScenarioRequest, Scenario } from './generated/scenario_pb'

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

  listScenarios(): Observable<Scenario[]> {
    console.log("Listing scenarios")
    let req = new ListScenarioRequest()
    req.setSearchterm("Search term for list request")

    return new Observable((observer) => {
      this.client.list(req, null, (err, res) => {
        console.log("Got list of scenarios back")
        console.log("ERR")
        console.log(err)
        console.log("RES")
        console.log(res.getScenarioList() )
        observer.next(res.getScenarioList())
      })
    })
  }
}
