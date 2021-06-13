import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoidfrontpagePage } from './photoidfrontpage.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoidfrontpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoidfrontpagePageRoutingModule {}
