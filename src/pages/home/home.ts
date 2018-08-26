import { Component } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';
import { TestService, TestModel } from '../../app/services/service'
import { Observable, Operator } from 'rxjs';
import { DaysModel } from '../../app/models/days.models';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular'


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
    let newDate = new Date(this.todayString);
    if (newDate.getDay() !== 0)  {
      this.showAlert();
      newDate = this.getCurrentSunday(newDate);
      this.getFirBaseDateFormat(newDate);
      return;
    }
    this.test.addToDbShifts(this.daysOfTheWeek,this.todayString,'user1');
    this.showToast('המשמרות עודכנו ')
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

  getSunday(d):Date {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() + 7 - day + (day == 0 ? -7:0); // adjust when day is sunday
    return new Date(d.setDate(diff));
    
  }

  getCurrentSunday(d):Date {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -0:0); // adjust when day is sunday
    return new Date(d.setDate(diff));
    
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'בחירת תאריך',
      subTitle: 'ניתן לבחור רק את היום הראשון בשבוע .המערכת תעדכן את התאריך בעבורך',
      buttons: ['OK']
    });
    alert.present();
  }


  getFirBaseDateFormat(today:Date):void {
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
  }

  constructor(public navCtrl: NavController, private test: TestService , public toastCtrl: ToastController,public alertCtrl: AlertController) {
    this.daysOfTheWeek = new DaysModel();
    let today = new Date();
    today = this.getSunday(today);
    this.getFirBaseDateFormat(today);
    console.log('fgfg' + this.todayString);
  }

  showToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: "middle"
    });

    toast.present(toast);
  }

}
