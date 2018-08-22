import {Injectable} from '@angular/core'
import { AngularFireDatabase} from 'angularfire2/database'
import { DaysModel } from '../models/days.models';

@Injectable()
export class TestService
{
    private testRef = this.db.list<TestModel>('test-model')
    //private testRef1 = this.db.list<DaysModel>('test-model/user/02-02-2002')
    constructor(private db: AngularFireDatabase){

    }
   

    getShifts(date:string,user :string){
        const testRef1 = this.db.list<DaysModel>(`test-model/${user}/${date}`);
        return testRef1;

    }

    addToDbShifts(daysModel: DaysModel,date:string,user :string){
        const testRef1 = this.db.list<DaysModel>(`test-model/${user}/${date}`);
        return testRef1.push(daysModel);

    }

    addToDb(){
        let test = new TestModel();
        test.firstName ='sdfsd';
        test.lastName ='sfdsf'
        return this.testRef.push(test);
    }
    getAll(){
        return this.testRef;
    }

}

export class TestModel{ 
    firstName: string;
    lastName:string
}