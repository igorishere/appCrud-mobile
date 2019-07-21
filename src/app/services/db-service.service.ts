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
    this.firebase.doc(`Items/${ idItem }`).update({
      name: editedName,
      modified: Date.now()
    })
  }
  delete(idItem: string) {
    this.firebase.doc(`Items/${idItem}`).delete();
  }
  
}
