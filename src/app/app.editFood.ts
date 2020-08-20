import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
    templateUrl: './aPP.editFood.html'
})
export class EditFoodComponent {
    _http: HttpClient;
    _url = "http://localhost:1337/";
    foodID: String;
    foodName: String;
    group: String;
    description: String;
    price: Number;
    _errorMessage: String = "";



    constructor(private http: HttpClient) {
        this._http = http;


    }






}