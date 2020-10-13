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
    unCompletedOrders;
    historyOrder; 
    historyPrice: number = 0;
    showHistory: Boolean = false;
    totalPrice: number = 0;
    tableNum: number;
    _errorMessage: String = "";



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

    submitOrder() {
        let url = this._url + "submitOrder/" + this.tableNum;
        if(!this.tableNum) {
            this._errorMessage = "Please enter a table number."
        }
        else if(this.totalPrice == 0) {
            this._errorMessage = "Please select at least one item."
        }
        else {
        let newItem = {
            "tableNum": this.tableNum,
            "totalPrice": this.totalPrice,
            "orderItems": this.orderedFood,
            "isCompleted": false,
        }
        this._http.post<any>(url, newItem)
        .subscribe(data =>{
            this._errorMessage = data.errorMessage;
            this.clearOrder();
        })
        if(this._errorMessage == "") {
            alert("The order has been placed.")

            } 
        }
    }

    clearOrder() {
        this.orderedFood = {};
        this.totalPrice = 0;
        this._errorMessage = "";
        this.showHistory = false;
    }

    orderHistory() {
        let url = this._url + "order/" + this.tableNum;

        this._http.get<any>(url)
            .subscribe(result => {
                this.unCompletedOrders = result.unCompletedOrders;
                this.combineUnCompletedOrders();
                this._errorMessage = result._errorMessage;
                if (!this.unCompletedOrders || this.unCompletedOrders.length == 0) {
                    this._errorMessage = "No order history."
                } else{
                    if(this.showHistory){
                        this.showHistory = false;
                    }
                    else{
                        this.showHistory = true;
                    }
                }
            })

    }

    combineUnCompletedOrders() {
        this.historyOrder = {};
        this.historyPrice = 0;
        for(let i in this.unCompletedOrders) {
            this.historyPrice += parseFloat(this.unCompletedOrders[i].totalPrice);
            for(let key in this.unCompletedOrders[i].orderItems[0]){
                if(!this.historyOrder[key]) {
                    this.historyOrder[key] = 0;
                }
                this.historyOrder[key] += this.unCompletedOrders[i].orderItems[0][key];
            }
        }  
    }

}