import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobtypePageRoutingModule } from './jobtype-routing.module';

import { JobtypePage } from './jobtype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobtypePageRoutingModule
  ],
  declarations: [JobtypePage]
})
export class JobtypePageModule {}
