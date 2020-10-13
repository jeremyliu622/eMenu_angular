import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';






@Component({
    templateUrl: './aPP.orders.html'
})
export class OrderComponent {
    _http: HttpClient;
    _url = "http://localhost:1337/";
    _selectedOrders;
    _unCompletedTables: Array<any> = [];
    tableNum: String;
    orderDate: String ;
    isCompleted: Boolean = false;
    combinedOrder;
    combinedPrice;
    isConfirmed: Boolean = false;
   

    constructor(private http: HttpClient) {
        this._http = http;
        this.orderDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-CA');
        this.showTables()
    }


    findOrders() {
        let url = this._url + "selectedOrders";
        let filter = {
            "tableNum": this.tableNum,
            "orderDate": this.orderDate,
            "isCompleted": this.isCompleted,
        }
        this._http.post<any>(url, filter)
        .subscribe(data =>{
            if (data.errorMessage == "") {
                let result = data.selectedOrders;
                result.sort((a,b) => (a.tableNum > b.tableNum) ? 1 : ((b.tableNum > a.tableNum) ? -1 : 0)); 
                this._selectedOrders = result;
            }
            else {
                alert("Something is wrong, please try again.")
            }
        })
    }
    
    table(tableNum) {
        this.tableNum = tableNum;
        this.isConfirmed = false;
        this.findOrders()
    }

    showTables() {
        let url = this._url + "selectedOrders";
        let filter = {
            "tableNum": "",
            "orderDate": this.orderDate,
            "isCompleted": false,
        }
        this._http.post<any>(url, filter)
        .subscribe(data =>{
            if (data.errorMessage == "") {
                let result = data.selectedOrders;
                for(let i in result) {
                    if(!this._unCompletedTables.includes(result[i].tableNum)){
                        this._unCompletedTables.push(result[i].tableNum)
                    }
                }
                this._unCompletedTables.sort()
            }
            else {
                alert("Something is wrong, please try again.")
            }
        })
    }

    confirm() {
        this.isConfirmed = true;
        this.combinedOrder = {};
        this.combinedPrice = 0;
        for(let i in this._selectedOrders) {
            this.combinedPrice += parseFloat(this._selectedOrders[i].totalPrice);
            for(let key in this._selectedOrders[i].orderItems[0]){
                if(!this.combinedOrder[key]) {
                    this.combinedOrder[key] = 0;
                }
                this.combinedOrder[key] += this._selectedOrders[i].orderItems[0][key];
            }
        }
    }

    checkout() {
        let url = this._url + "completeOrder";

        for(let i in this._selectedOrders) {

            let filter = {
                "_id": this._selectedOrders[i]._id
            }
            this._http.post<any>(url, filter)
            .subscribe(data =>{
            })
        }
        
        location.reload();
    }
    
}