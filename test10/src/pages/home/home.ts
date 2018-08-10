import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TestService,TestModel} from '../../app/services/service'
import { Observable ,Operator } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //testList$: Observable<TestModel[]>;

  addToFire(){
    this.test.addToDb();
  console.log("hello from button");
  }
  showAll(){
     this.test.getAll().valueChanges().subscribe((datas) => { 
       
      console.log("datas", datas)
    },(err)=>{
       console.log("probleme : ", err)
    });
  }
  constructor(public navCtrl: NavController, private  test :TestService) {

  }

}
