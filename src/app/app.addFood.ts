import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


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




    constructor(private http: HttpClient, private route: Router ) {
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
            if (data.errorMessage == "") {
                alert("The " + this.foodName + " has been added.")
                this.route.navigate([''])
            }
            else {
                alert("Something is wrong, please try again.")
            }
        })
    }

}