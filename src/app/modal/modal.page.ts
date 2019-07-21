import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DbServiceService } from '../services/db-service.service';
import { Observable, empty } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  private newItem: string;

  constructor(
    private modalController: ModalController,
    private db: DbServiceService,
    private toast: ToastController
    ) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  saveNewItem() {
    if( this.newItem  ){
      //saving new item
      this.db.create(this.newItem);

      // toast with 'Saved' messaged
      this.toast.create({
        message:'salvo!',
        duration: 2000
      }).then(
        toast=>{
          toast.present();
        }
      )
      // reseting the item
      this.newItem = "";
      // Closing the modal
      this.dismiss();
    }else{
      this.toast.create({
        message: 'Campo vazio, insira um valor',
        duration: 2000
      }).then(
        toast => {
          toast.present();
        }
      )
    }
  }
}
