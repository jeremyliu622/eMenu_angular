import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
    templateUrl: './aPP.editFood.html'
})
export class EditFoodComponent {
    _http: HttpClient;
    _url = "http://localhost:1337/";
    foodID: String;
    selectedFood: any;
    foodName: String;
    group: String;
    description: String;
    price: Number;
    _errorMessage: String = "";



    constructor(private http: HttpClient,
        private activatedRoute: ActivatedRoute,
        private route: Router) {

        this._http = http;
        this.getFoodID();
        this.getSelectedFood();

    }

    getFoodID() {
        this.activatedRoute.queryParams
            .subscribe(params => {
                this.foodID = params.foodID
            })
    }

    getSelectedFood() {
        let url = this._url + "admin/selectedFood/" + this.foodID;

        this._http.get<any>(url)
            .subscribe(result => {
                this.selectedFood = result.selectedFood;
                this._errorMessage = result.errorMessage;
                if (this._errorMessage != "") {
                    this._errorMessage = "food ID: " + this.foodID + " does not exist."
                }
            })
    }

    updateFood() {
        let url = this._url + "admin/updateFood/" + this.foodID;


        this._http.post<any>(url, this.selectedFood)
            .subscribe(data => {
                if (data.errorMessage == "") {
                    alert("The food (id: " + this.foodID + ") has been updated.")
                    this.route.navigate([''])
                }
                else {
                    alert("Something is wrong, please try again.")
                }
            })

    }


}