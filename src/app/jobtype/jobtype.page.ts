import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobtype',
  templateUrl: './jobtype.page.html',
  styleUrls: ['./jobtype.page.scss'],
})
export class JobtypePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelectJobType(jobtype: string){
    this.router.navigateByUrl('/home/' + jobtype);
  }

}
