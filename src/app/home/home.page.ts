import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DbServiceService } from '../services/db-service.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private storedItems: Observable<any[]>;

  constructor(
    // builder for modal
    private modalController: ModalController,

    // Database 
    private db: DbServiceService
    ) {
      this.storedItems = this.db.read();
    }

  async showModalNewItem(){
    const modal = await this.modalController.create({
      component: ModalPage
    });
    return await modal.present();
  }

}
