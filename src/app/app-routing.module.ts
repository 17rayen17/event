import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutEventComponent } from './ajout-event/ajout-event.component';
import { InterfaceComponent } from './interface/interface.component';
import { LogInComponent } from './log-in/log-in.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';

const routes: Routes = [
  {path:'login',component:LogInComponent},
  {path:'ajout',component:AjoutEventComponent},
  {path:'loginadmin',component:LoginadminComponent},
  {path:'interface',component:InterfaceComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
