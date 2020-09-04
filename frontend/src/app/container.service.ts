import { Injectable } from '@angular/core';
import { CreateServiceClient } from './generated/container_pb_service';
import { CreateRequest } from './generated/container_pb';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  client: CreateServiceClient

  constructor() {
    this.client = new CreateServiceClient('http://localhost:8082')
   }

   createContainer(name): Observable<string> {
    return Observable.create((observer) => {
      const req = new CreateRequest();
      req.setName(name)
      this.client.create(req, (err, response) => {
        console.log("Responseeeeeeee")
	console.log(response)
        observer.next(response.getValue())
      })
    }) 
    
   }
}
