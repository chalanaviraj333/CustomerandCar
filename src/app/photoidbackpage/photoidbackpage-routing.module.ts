import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoidbackpagePage } from './photoidbackpage.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoidbackpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoidbackpagePageRoutingModule {}
