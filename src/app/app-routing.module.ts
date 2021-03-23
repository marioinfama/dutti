import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { LoginComponent } from './users/components/login/login.component';
import { RegisterComponent } from './users/components/register/register.component';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  { path: '', loadChildren: './users/users.module#UsersModule'},
  //{ path: 'register', component: RegisterComponent},
  { path: 'principal', loadChildren: () => import(`./pages/pages.module`).then(m => m.PagesModule), canLoad: [ UsuarioGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
