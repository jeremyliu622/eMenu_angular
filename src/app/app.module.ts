import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }    from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './app.menu';
import { AddFoodComponent } from './app.addFood';
import { EditFoodComponent } from './app.editFood';
import { OrderComponent } from './app.orders';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AddFoodComponent,
    EditFoodComponent,
    OrderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
