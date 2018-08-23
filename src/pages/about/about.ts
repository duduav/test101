import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TestService, TestModel } from '../../app/services/service';
import { DaysModel } from '../../app/models/days.models';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  todayString:string;
  days: DaysModel[];
  daysOfTheWeek:DaysModel;

  showAll() {
    this.test.getShifts(this.todayString,"user1").valueChanges().subscribe((data) => {
      this.days = data;
      if (data && data.length > 0 )
        this.daysOfTheWeek =data[data.length-1];
      console.log("datas", data)
    }, (err) => {
      console.log("probleme : ", err)
    });
  }
  
  getSunday(d):Date {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:0); // adjust when day is sunday
    return new Date(d.setDate(diff));
    
  }

  constructor(public navCtrl: NavController, private test: TestService) {
    let today = new Date();
    today = this.getSunday(today);
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
    this.daysOfTheWeek = new DaysModel();
    this.showAll();

  }

}
