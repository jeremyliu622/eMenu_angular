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
    _foodGroupDict;
    selectedFood;
    orderedFood: Object = {};
    totalPrice: number = 0;



    constructor(private http: HttpClient, private router: Router) {
        this._http = http;
        this.getAllFood();

    }



    getAllFood() {
        let url = this._url + "menu";
        this._http.get<any>(url)
            .subscribe(result => {
                this._allFoodArray = result.allFood;
                this.sortFoodIntoGroups()

            });
    }

    sortFoodIntoGroups(){
        this._foodGroupDict = {};
        for(let i in this._allFoodArray) {
            // console.log(this._allFoodArray[i].group)
            if(!this._foodGroupDict[this._allFoodArray[i].group]) {
                this._foodGroupDict[this._allFoodArray[i].group] = []
            }
            this._foodGroupDict[this._allFoodArray[i].group].push(this._allFoodArray[i])
        };
        // console.log(this._foodGroupDict);

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


    onSelect(food) {
        this.selectedFood = food;
    }

    foodIncrease(food) {
        if(this.orderedFood[food.foodName] >= 0) {
            this.orderedFood[food.foodName] += 1;

        }
        else{
            this.orderedFood[food.foodName] = 1;
        }
        this.totalPrice += food.price;
    }

    foodDecrease(food) {
        if(this.orderedFood[food.foodName] > 0) {
            this.orderedFood[food.foodName] -= 1;
            this.totalPrice -= food.price;

        }
        else{
            this.orderedFood[food.foodName] = 0;
        }

    }


}