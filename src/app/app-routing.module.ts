import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './Component/admin/admin.component';
import { ResponseCardComponent } from './Component/response-card/response-card.component';
import { UserComponent } from './Component/user/user.component';

const routes: Routes = [
  {path:'user', component:UserComponent},
  {path:'admin',component:AdminComponent},
  {path:'response',component:ResponseCardComponent},
  {path:'home',component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
