import { Injectable } from '@angular/core';
import { CreateServiceClient } from './generated/ContainerServiceClientPb';
import { CreateRequest } from './generated/container_pb';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  client: CreateServiceClient

  constructor() {
    this.client = new CreateServiceClient(environment.url)
   }

   createContainer(name): Observable<string> {
    return Observable.create((observer) => {
      const req = new CreateRequest();
      req.setName(name)
      this.client.create(req, null, (err, response) => {
        console.log("Responseeeeeeee")
	console.log(response)
        observer.next(response.getValue())
      })
    }) 
    
   }
}
