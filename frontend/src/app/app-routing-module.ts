import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { MainComponent } from './main/main.component';
import { EintragComponent } from "./eintrag/eintrag.component";
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { ProfilComponent } from "./profil/profil.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {AdminGuiHomeComponent} from "./admin-gui-home/admin-gui-home.component";

const routes: Routes = [
  { path: 'edit', component: EditComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'main', component: MainComponent },
  { path: 'eintrag/:id', component: EintragComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'changePassword', component: PasswordResetComponent },
  { path: 'admin/home', component: AdminGuiHomeComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
