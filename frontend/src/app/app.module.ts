import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './student/home/home.component';
import { AddScenarioComponent } from './add-scenario/add-scenario.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    LoginComponent,
    HomeComponent,
    AddScenarioComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
