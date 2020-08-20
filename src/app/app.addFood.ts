import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
    templateUrl: './app.addFood.html'
})
export class AddFoodComponent {
    _http: HttpClient;
    _url = "http://localhost:1337/";
    foodName: String;
    group: String;
    description: String;
    price: Number;
    _errorMessage: String = "";




    constructor(private http: HttpClient) {
        this._http = http;

    }

    addFood() {
        let url = this._url + "admin/createFood";
        let newFood = {
            "foodName": this.foodName,
            "group": this.group,
            "description": this.description,
            "price": this.price
        }
        this._http.post<any>(url, newFood)
        .subscribe(data =>{
            this._errorMessage = data.errorMesage;
            if(this._errorMessage == "") {
                console.log("ok")
            }
            else{
                console.log(this._errorMessage)
            };
        })
    }

}