import { Injectable } from '@angular/core';
import { CRUD } from '../interface/crud';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class DbServiceService implements CRUD{

  constructor(private firebase: AngularFirestore) { }

  create(name: string) {
    let newItem = this.firebase.collection("Items").add({
      name: name,
      id: this.firebase.createId(),
      modified: Date.now()
    })
  }

  read() {
    var itemCollection = this.firebase.collection("Items", ref => ref.orderBy('modified'));
    return itemCollection.snapshotChanges();
  }
  update(idItem: any, editedName: any) {
    throw new Error("Method not implemented.");
  }
  delete(idItem: string) {
    throw new Error("Method not implemented.");
  }
  
}
