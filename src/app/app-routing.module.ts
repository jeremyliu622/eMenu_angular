import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { MenuComponent } from './app.menu';
import { AddFoodComponent } from './app.addFood';
import { EditFoodComponent }from './app.editFood'

const appRoutes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'admin/addFood', component: AddFoodComponent },
  { path: "editFood/:foodID", component: EditFoodComponent},
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
