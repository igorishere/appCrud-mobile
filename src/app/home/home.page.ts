import { Component } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
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
    private db: DbServiceService,

    // Alert
    private alert: AlertController,

    //Toast
    private toast: ToastController
    ) {

      // list of all saved items
      this.storedItems = this.db.read();
    }

  async showModalNewItem(){
    const modal = await this.modalController.create({
      component: ModalPage
    });
    return await modal.present();
  }

  deleteItem(item: string, id: string){

    let nomeItemAtual = item; 

    this.alert.create({
      header: 'Atenção!',
      message: `Para excluir, digite <br/><b>${nomeItemAtual}</b><br/> no campo`,
      backdropDismiss: true,
      inputs:[
        {
          name: 'digitedItemName',
          type: 'text',
          placeholder: 'Nome do item'
        }
      ],
      buttons: [
        {
          text: "Sim",
          handler: (data) => {
            if (data.digitedItemName == nomeItemAtual) {

              // Send ID and delete the item
              this.db.delete(id);

              // Feedback for user
              this.toast.create({
                color: "primary",
                message: 'Excluído com sucesso',
                duration: 1000
              }).then(
                toast => {
                  toast.present()
                }
              )
            } else {
              this.toast.create({
                color: "warning",
                message: 'Nome incorreto, digite novamente',
                duration: 1000
              }).then(
                toast=>{
                  toast.present()
                }
              )
            }

          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }
      ],
    }).then(
      alert=>{
        alert.present();
      }
    )
  }

  editItem(atualItemNome: string,id: string){
     
    // Alert for edit item
    this.alert.create({
    header: 'Editar item',
    message: `Digite um novo nome para o item <b>${atualItemNome}</b>`,
    inputs: [
      {
        name: 'newItemName',
        placeholder: 'Novo nome'
    } 
    ],
    buttons: [
      {
        text: 'Salvar',
        handler: (data)=>{
          let newItemName = data.newItemName;

          if(newItemName){

            // Send alterations 
            this.db.update(id,newItemName);

            //sucess feedback
            this.toast.create({
              color: "primary",
              duration: 2000,
              message: 'Alterações salvas'
            }).then(
              (toast) => {
                toast.present();
              }
            )
          }else{

            // Message if the field was empty
            this.toast.create({
            color: "danger",
            duration: 2000,
            message: 'Campo vazio, nada para alterar'
            }).then(
              (toast)=>{
                toast.present();
              }
            )
          }  
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
    ]
    }).then(
      alert=>{
        alert.present();
      }
    )
  }

}
