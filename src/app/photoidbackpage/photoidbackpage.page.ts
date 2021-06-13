import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { UserPhoto, PhotoService } from '../services/photo.service';
import { CustomerData } from '../customer-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photoidbackpage',
  templateUrl: './photoidbackpage.page.html',
  styleUrls: ['./photoidbackpage.page.scss'],
})
export class PhotoidbackpagePage implements OnInit {

  public customerData: CustomerData = {};
  private enteredCarRego: boolean = false;

  constructor(public photoService: PhotoService, public actionSheetController: ActionSheetController,
    private activatedRoute: ActivatedRoute
    ) {
      this.activatedRoute.paramMap.subscribe((paramMap) => {
        if (paramMap.has("customerFirstName" && "customerLastName" && "phoneNumber" && "jobType" && "carRego")) {
          this.customerData.customerFirstName = paramMap.get("customerFirstName");
          this.customerData.customerLastName = paramMap.get("customerLastName");
          this.customerData.phoneNumber = paramMap.get("phoneNumber");
          this.customerData.jobType = paramMap.get("jobType");
          this.customerData.carRego = paramMap.get("carRego");
          
          this.enteredCarRego = true;
        }
        else if (paramMap.has("customerFirstName" && "customerLastName" && "phoneNumber" && "jobType"))
        {
          this.customerData.customerFirstName = paramMap.get("customerFirstName");
          this.customerData.customerLastName = paramMap.get("customerLastName");
          this.customerData.phoneNumber = paramMap.get("phoneNumber");
          this.customerData.jobType = paramMap.get("jobType");
        }
        
        
      });
    }

  ngOnInit() {
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
         }
      }]
    });
    await actionSheet.present();
  }


  async onClickNext() {

    await this.photoService.uploadPhotoIdBackPage(this.customerData, this.enteredCarRego);    
  }

}

