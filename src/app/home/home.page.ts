import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { CustomerData } from '../customer-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public selectedJobType: string;
  public houseJob: boolean = false;

  constructor(private router: Router,
    public photoService: PhotoService,
    private activatedRoute: ActivatedRoute) { 

      this.activatedRoute.paramMap.subscribe((paramMap) => {
        if (!paramMap.has("jobtype")) {
          // redirect
          return;
        }
        this.selectedJobType = paramMap.get("jobtype");
        if (this.selectedJobType == 'houselockedout')
        {
          this.houseJob = true;
        }
        
        
      });
    }

  ngOnInit() {
    
  }

   onSubmit(form: NgForm) {
    const newCustomer: CustomerData = {customerFirstName: form.value.customerFirstName,
       customerLastName: form.value.customerLastName,
        phoneNumber: form.value.phoneNumber, carRego: form.value.carRego, jobType: this.selectedJobType};

    if (newCustomer.carRego == undefined){
      this.router.navigateByUrl('termsandconditions/' + newCustomer.customerFirstName + '/' + newCustomer.customerLastName + '/' + newCustomer.phoneNumber + '/' + newCustomer.jobType);
      return;
    }
    this.router.navigateByUrl('termsandconditions/'
    + newCustomer.customerFirstName + '/' + newCustomer.customerLastName + '/' + newCustomer.phoneNumber + '/' + newCustomer.jobType + '/' + newCustomer.carRego);

    
  }

}
