import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Contact} from "../Models/contact.model";

@Injectable()
export class FirebaseService {
  constructor(   private firestore: AngularFirestore   ) {}


  getQueries() {
    return this.firestore.collection("User_Queries").snapshotChanges();
  }

  createQuery(query: Contact){
    return this.firestore.collection('User_Queries').add(JSON.parse(JSON.stringify(query)));
  }

  updateQuery(query: Contact){
    delete query.id;
    this.firestore.doc('User_Queries/' + query.id).update(query);
  }

  deleteQuery(queryId: string){
    this.firestore.doc('User_Queries/' + queryId).delete();
  }


}
