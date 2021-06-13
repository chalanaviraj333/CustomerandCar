import { Component, OnInit, ViewChild, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import SignaturePad from 'signature_pad';
import { PhotoService } from '../services/photo.service';
import { base64StringToBlob } from 'blob-util';
import { CustomerData } from '../customer-data';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterViewInit {

  public customerData: CustomerData = {};
  private enteredCarRego: boolean = false;

  @ViewChild('canvas', { static: true }) signaturePadElement;
  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;

  constructor(private elementRef: ElementRef,
  public photoService: PhotoService,
  private storage: AngularFireStorage,
  private router: Router,
  private activatedRoute: ActivatedRoute,
  public loadingController: LoadingController,
  private http: HttpClient) {

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

  ngOnInit(): void {
    this.init();

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.init();
  }

  init() {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 140;
    if (this.signaturePad) {
      this.signaturePad.clear(); // Clear the pad on init
    }
  }

  public ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.signaturePad.clear();
    this.signaturePad.penColor = 'rgb(56,128,255)';
  }

  save(): void {
    const img = this.signaturePad.toDataURL();
  }

  isCanvasBlank(): boolean {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty() ? true : false;
    }
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }


  async onClickNext() {

    await this.http.post('https://cusandcar-default-rtdb.firebaseio.com/customerdetails.json', this.customerData).subscribe(
          resData => {}
        )

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please Wait..',
      backdropDismiss: false
    });
    await loading.present();
    const img = this.signaturePad.toDataURL();
    const contenttype = 'image/png';
    const b64Data = img.split(',').pop();
    const blob = base64StringToBlob(b64Data, contenttype);

    const filename = this.customerData.customerFirstName + this.customerData.customerLastName + this.customerData.phoneNumber;
    
    const uploadTask = this.storage.upload('customersigns/' + filename, blob);

    uploadTask.percentageChanges().subscribe(changes => {
  
      if (changes == 100 && this.enteredCarRego == true){
        this.router.navigateByUrl('addphotoIDFront/' + this.customerData.customerFirstName + '/' + this.customerData.customerLastName + '/' + this.customerData.phoneNumber + '/' + this.customerData.jobType + '/' + this.customerData.carRego);
        loading.dismiss();
        return;
      }
      else if (changes == 100 && this.enteredCarRego == false)
      {
        this.router.navigateByUrl('addphotoIDFront/' + this.customerData.customerFirstName + '/' + this.customerData.customerLastName + '/' + this.customerData.phoneNumber + '/' + this.customerData.jobType);
        loading.dismiss();
        return;
      }
    });

  }

}
