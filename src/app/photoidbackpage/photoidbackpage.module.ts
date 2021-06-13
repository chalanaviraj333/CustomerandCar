import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoidbackpagePageRoutingModule } from './photoidbackpage-routing.module';

import { PhotoidbackpagePage } from './photoidbackpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoidbackpagePageRoutingModule
  ],
  declarations: [PhotoidbackpagePage]
})
export class PhotoidbackpagePageModule {}
