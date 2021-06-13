import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { CustomerData } from '../customer-data';
import firebase from 'firebase/app';
import 'firebase/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailviewpage',
  templateUrl: './detailviewpage.page.html',
  styleUrls: ['./detailviewpage.page.scss'],
})
export class DetailviewpagePage implements OnInit {

  public customerData: CustomerData = {};
  public customerPhotoIDFrontPage: string = '';
  public customerPhotoIDBackPage: string = '';
  public customerSignImage: string = '';


  // public customerDatawithImages: CustomerDataWithImages = {customerFirstName: '', customerLastName: '', phoneNumber: '', carRego: '', photoIDURL: '', signatureURL: ''};

  constructor(public photoService: PhotoService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.has("customerFirstName" && "customerLastName" && "phoneNumber")) {
        this.customerData.customerFirstName = paramMap.get("customerFirstName");
        this.customerData.customerLastName = paramMap.get("customerLastName");
        this.customerData.phoneNumber = paramMap.get("phoneNumber");
      }
    
   })
  }

  async ngOnInit() {

    const filename = this.customerData.customerFirstName + this.customerData.customerLastName+ this.customerData.phoneNumber;

    await firebase.storage().ref().child('customerPhotoID-Front/' + filename ).getDownloadURL().then
      (response => {

        this.customerPhotoIDFrontPage = response;

        });

    await firebase.storage().ref().child('customerPhotoID-Back/' + filename ).getDownloadURL().then
      (response => {
  
        this.customerPhotoIDBackPage = response;
  
      });
  }

}
