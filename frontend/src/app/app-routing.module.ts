import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent as StudentHomeComponent } from './student/home/home.component';
import { HomeComponent as ProfessorHomeComponent } from './professor/home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentgaurdService } from './studentgaurd.service';
import { AddScenarioComponent } from './add-scenario/add-scenario.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'student-home', component: StudentHomeComponent,
    canActivate: [StudentgaurdService],
    data: {
      expectedRole: 'student'
    }
  },
  {
    path: 'professor-home', component: ProfessorHomeComponent,
    canActivate: [StudentgaurdService],
    data: {
      expectedRole: 'professor'
    }
  },
  {
    path: 'add-scenario', component: AddScenarioComponent,
    canActivate: [StudentgaurdService],
    data: {
      expectedRole: 'professor'
    }
  },
  {
    path: '*',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
