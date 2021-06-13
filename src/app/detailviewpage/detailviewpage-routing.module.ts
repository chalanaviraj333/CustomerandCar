import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailviewpagePage } from './detailviewpage.page';

const routes: Routes = [
  {
    path: '',
    component: DetailviewpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailviewpagePageRoutingModule {}
