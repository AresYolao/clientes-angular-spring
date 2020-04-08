import { NgModule, Component } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { BodyComponent } from './components/body/body.component';
import { FormComponent } from './clientes/form.component';

const routes: Routes = [ 
{path: 'clientes', component: ClientesComponent},
{path: 'clientes/page/:page', component: ClientesComponent},
{path: 'formulario', component: BodyComponent},
{path: 'clientes/form', component: FormComponent},
{path: 'clientes/form/:id', component: FormComponent},
{path: '**', pathMatch: 'full', redirectTo: '/clientes'}];
@NgModule({
  imports: [
   RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
