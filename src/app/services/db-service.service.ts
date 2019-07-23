import { Injectable } from '@angular/core';
import { CRUD } from '../interface/crud';
import { AngularFirestore } from '@angular/fire/firestore';
import { item } from '../classe/item';

@Injectable({
  providedIn: 'root'
})

export class DbServiceService implements CRUD{

  constructor(private firebase: AngularFirestore) { }

  create(name: string) {
    let ID = this.firebase.createId()

    // saving new item in Firebase
    this.firebase.collection("Items").add({
      name: name,
      id: ID,
      modified: Date.now()
    })

    // updating data about the last saved item
    this.firebase.doc('LastSavedItem/1').update({
      itemId: ID,
      itemName: name
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

  getLastSavedItem(){
    return this.firebase.doc<item>("LastSavedItem/1").valueChanges();
  }
  
}
