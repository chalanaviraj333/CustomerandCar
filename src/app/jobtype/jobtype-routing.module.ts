import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobtypePage } from './jobtype.page';

const routes: Routes = [
  {
    path: '',
    component: JobtypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobtypePageRoutingModule {}
