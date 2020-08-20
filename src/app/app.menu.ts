import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
    templateUrl:'./app.menu.html'
})
export class MenuComponent {
    _http: HttpClient;
    _url = "http://localhost:1337/";
    _allFoodArray: Array<any>;
    foodID: String;


    constructor(private http: HttpClient) {
        this._http = http;
        this.getAllFood();
    }

    getAllFood() {
        let url = this._url + "menu"
        this._http.get<any>(url)
        .subscribe(result => {
            this._allFoodArray = result.allFood
        })
    }

    deleteFood(foodID) {
        let url = this._url + "admin/deleteFood/" + foodID
        this._http.delete<any>(url)
        .subscribe(data =>{
            console.log("ok");
            this.getAllFood();
        })
    }

    editFood(foodID) {
        
    }

    



}