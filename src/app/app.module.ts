import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }    from '@angular/forms';


import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './app.menu';
import { AddFoodComponent } from './app.addFood';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AddFoodComponent,

  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
