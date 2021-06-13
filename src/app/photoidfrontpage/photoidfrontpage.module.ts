import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoidfrontpagePageRoutingModule } from './photoidfrontpage-routing.module';

import { PhotoidfrontpagePage } from './photoidfrontpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoidfrontpagePageRoutingModule
  ],
  declarations: [PhotoidfrontpagePage]
})
export class PhotoidfrontpagePageModule {}
