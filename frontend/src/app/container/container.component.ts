import { Component, OnInit } from '@angular/core';
import { ContainerService } from '../container.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  message: string = "default"

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {
    this.containerService.createContainer("Changed Test container", "derrek").subscribe((response) =>{
      this.message = response
    })
  }

}
