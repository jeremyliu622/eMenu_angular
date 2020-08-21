import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
    templateUrl: './app.menu.html'
})
export class MenuComponent {
    _http: HttpClient;
    _url = "http://localhost:1337/";
    _allFoodArray: Array<any>;


    constructor(private http: HttpClient, private router: Router) {
        this._http = http;
        this.getAllFood();
    }

    getAllFood() {
        let url = this._url + "menu";
        this._http.get<any>(url)
            .subscribe(result => {
                this._allFoodArray = result.allFood
            })
    }

    deleteFood(foodID, foodName) {
        let deleteConfirm = confirm('Are you sure to delete ' + foodName + "?");
        
        if(deleteConfirm){
            let url = this._url + "admin/deleteFood/" + foodID;
            
            this._http.delete<any>(url)
                .subscribe(data => {
                    console.log("ok");
                    this.getAllFood();
                })
        }

    }

    editFood(foodID) {
        this.router.navigate(['/admin/editFood'], {queryParams: {foodID: foodID}})
    }





}