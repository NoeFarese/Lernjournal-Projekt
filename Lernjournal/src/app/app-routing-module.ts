import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./features/login/login.component";
import {RegistrationComponent} from "./features/registration/registration.component";
import {MainComponent} from "./features/main/main.component";
import {EditComponent} from "./features/edit/edit.component";
import {EintragComponent} from "./features/eintrag/eintrag.component";

const routes: Routes = [
  { path: 'edit', component: EditComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'main', component: MainComponent },
  { path: 'eintrag/:id', component: EintragComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
