import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TestService, TestModel } from '../../app/services/service';
import { DaysModel } from '../../app/models/days.models';
import { AlertController } from 'ionic-angular'
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  todayString:string;
  days: DaysModel[];
  daysOfTheWeek:DaysModel;

  showAll() {
    let newDate = new Date(this.todayString);
    if (newDate.getDay() !== 0)  {
      this.showAlert();
      newDate = this.getSunday(newDate);
      this.getFirBaseDateFormat(newDate);
      return;
    }
    this.test.getShifts(this.todayString,"user1").valueChanges().subscribe((data) => {
      this.days = data;
      if (data && data.length > 0 ){
        this.daysOfTheWeek =data[data.length-1];
      }else{
        this.daysOfTheWeek = new DaysModel();
      }
      console.log("datas", data);
      this.showToast("נתונים  אוחזרו בהצלחה");
    }, (err) => {
      console.log("probleme : ", err)
      this.showToast("כשלון  פנה  למנהל מערכת");
    });
  }
  
  getSunday(d):Date {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -0:0); // adjust when day is sunday
    return new Date(d.setDate(diff));
    
  }
  
 
  showToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: "middle"
    });

    toast.present(toast);
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
  constructor(public navCtrl: NavController, private test: TestService,public alertCtrl: AlertController, public toastCtrl: ToastController) {
    let today = new Date();
    today = this.getSunday(today)
    this.getFirBaseDateFormat(today);
    console.log('fgfg' + this.todayString);
    this.daysOfTheWeek = new DaysModel();
    this.showAll();

  }

}
