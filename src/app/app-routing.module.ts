import { MenuComponent } from './app.menu';
import { AddFoodComponent } from './app.addFood';
import { EditFoodComponent }from './app.editFood'



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'admin/addFood', component: AddFoodComponent },
  { path: "admin/editFood", component: EditFoodComponent},
  // { path: '', redirectTo: '/menu', pathMatch: 'full' },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }