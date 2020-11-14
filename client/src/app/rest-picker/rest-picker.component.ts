import { Component, OnInit } from "@angular/core";


@Component({
    selector: "app-rest-picker",
    templateUrl: "./rest-picker.component.html",
    styleUrls: ["./rest-picker.component.css"]
})
export class RestPickerComponent implements OnInit {
    private rests: string[] = ["Bertucci's", "Cafe Assisi", "Cibbo", "Canova", "Davio's", "Fresh Catch", "Kyoto", "Sabatino's", "Trattoria Della Nona", "Trattoria De Romana"];

    public rest: string;

    ngOnInit(): void {
        this.newRandRest();
    }

    newRandRest(): void{
        let n =  Math.floor(Math.random()*this.rests.length);
        if(this.rest===this.rests[n]) {
            this.newRandRest();
        } else {
            this.rest = this.rests[n];
        }
    }
    
}