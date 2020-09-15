import { Injectable } from '@angular/core';
import { CreateServiceClient } from './generated/ContainerServiceClientPb';
import { CreateRequest } from './generated/container_pb';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthInterceptor } from './authinterceptor';


@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  client: CreateServiceClient

  constructor() {
    const authInterceptor = new AuthInterceptor()
    let options = {

      unaryInterceptors: [authInterceptor],
      streamInterceptors: [authInterceptor]
    }
    this.client = new CreateServiceClient(environment.url, null, options)
  }

  createContainer(name): Observable<string> {
    return new Observable((observer) => {
      const req = new CreateRequest();
      req.setName(name)
      this.client.create(req, null, (err, response) => {
        console.log("Response from create container")
        console.log(response)
        observer.next(response.getValue())
      })
    })

  }
}
