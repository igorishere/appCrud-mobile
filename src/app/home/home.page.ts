import { Component } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
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
    private toastController: ToastController
    ) {

      // list of all saved items
      this.storedItems = this.db.read();
    }

  toastMessege(
    // Message to toast
    message: string,
    // class with color for toast
    color: string,
    // view time 
    duration: number){

    const toast = this.toastController.create({
      color: `${color}`,
      message: `${message}`,
      duration: duration,
      position: "middle"
    }).then(
      toast=>{
        toast.present()
      }
    )

    return toast;
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
            this.toastMessege("Excluído com sucesso","primary",2000);

            } else {
              this.toastMessege("Nome incorreto, digite novamente","danger",2000)
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
            this.toastMessege("Alterações salvas","primary",2000);

          }else{

            // Message if the field was empty
            this.toastMessege("Campo vazio, nada para alterar","danger",2000);
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

  createNewItem(){
    this.alert.create({
      header: 'Novo item',
      message: 'Insira um nome para o novo item',
      backdropDismiss: true,
      inputs: [
        {
          name: 'newItem',
          placeholder: 'Nome'
        }
      ],
      buttons: [
        {
          text: "Salvar",
          handler: (data)=>{
            let newItem = data.newItem;

            if (newItem){
              this.db.create(newItem);
              this.toastMessege("Salvo com sucesso","primary",2000);

            }else{
              this.toastMessege("Campo vazio, insira alguma informação para salvar o item","danger",2000);
            }
            
          }
        },
        {
          text: "Cancelar",
          role: "cancel"
        }
      ]
    }).then(
      (alert)=>{
        alert.present();
      }
      )
    
  }

}
