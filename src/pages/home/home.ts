import { Component } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';
import { TestService, TestModel } from '../../app/services/service'
import { Observable, Operator } from 'rxjs';
import { DaysModel } from '../../app/models/days.models';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {

  daysOfTheWeek : DaysModel;
  dateTimeTest: Date;  
  testList: TestModel[];
  
  today: Date
  todayString: string;

  addToFire() {
    console.log(this.todayString);
    this.test.addToDb();
    this.test.addToDbShifts(this.daysOfTheWeek,this.todayString,'user1');
    console.log("hello from button");
  }
  showAll() {
    this.test.getAll().valueChanges().subscribe((datas) => {
      this.testList = datas;
      console.log("datas", datas)
    }, (err) => {
      console.log("probleme : ", err)
    });
  }
  constructor(public navCtrl: NavController, private test: TestService) {
    this.daysOfTheWeek = new DaysModel();
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    let day = dd.toString();
    let month = mm.toString(); 

    if (dd < 10) {
      day = '0' + dd
    }

    if (mm < 10) {
      month = '0' + mm
    }

    this.todayString = yyyy + '-' + month + '-' + day;
    console.log('fgfg' + this.todayString);
  }

}
