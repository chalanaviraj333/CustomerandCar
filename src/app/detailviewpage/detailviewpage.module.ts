import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailviewpagePageRoutingModule } from './detailviewpage-routing.module';

import { DetailviewpagePage } from './detailviewpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailviewpagePageRoutingModule
  ],
  declarations: [DetailviewpagePage]
})
export class DetailviewpagePageModule {}
