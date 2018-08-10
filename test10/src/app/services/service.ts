import {Injectable} from '@angular/core'
import { AngularFireDatabase} from 'angularfire2/database'

@Injectable()
export class TestService
{
    private testRef = this.db.list<TestModel>('test-model')
    constructor(private db: AngularFireDatabase){

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