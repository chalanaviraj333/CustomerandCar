import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerData } from '../customer-data';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.page.html',
  styleUrls: ['./termsandconditions.page.scss'],
})
export class TermsandconditionsPage implements OnInit {

  public isChecked: boolean = false;
  public customerData: CustomerData = {};
  private enteredCarRego: boolean = false;

  constructor(private router: Router, public photoService: PhotoService,
    private activatedRoute: ActivatedRoute) {
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

  onClickNext() {

    if (this.enteredCarRego == true){
      this.router.navigateByUrl('signinpage/'
    + this.customerData.customerFirstName + '/' + this.customerData.customerLastName + '/' + this.customerData.phoneNumber + '/' + this.customerData.jobType + '/' + this.customerData.carRego);
    return;
    }
    this.router.navigateByUrl('signinpage/' + this.customerData.customerFirstName + '/' + this.customerData.customerLastName + '/' + this.customerData.phoneNumber + '/' + this.customerData.jobType);


  }

}
