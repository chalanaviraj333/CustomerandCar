import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./jobtype/jobtype.module').then( m => m.JobtypePageModule)
  },
  {
    path: 'home/:jobtype',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'addphotoIDFront/:customerFirstName/:customerLastName/:phoneNumber/:jobType',
    loadChildren: () => import('./photoidfrontpage/photoidfrontpage.module').then( m => m.PhotoidfrontpagePageModule)
  },
  {
    path: 'addphotoIDFront/:customerFirstName/:customerLastName/:phoneNumber/:jobType/:carRego',
    loadChildren: () => import('./photoidfrontpage/photoidfrontpage.module').then( m => m.PhotoidfrontpagePageModule)
  },
  {
    path: 'signinpage/:customerFirstName/:customerLastName/:phoneNumber/:jobType',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'signinpage/:customerFirstName/:customerLastName/:phoneNumber/:jobType/:carRego',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'termsandconditions/:customerFirstName/:customerLastName/:phoneNumber/:jobType',
    loadChildren: () => import('./termsandconditions/termsandconditions.module').then( m => m.TermsandconditionsPageModule)
  },
  {
    path: 'termsandconditions/:customerFirstName/:customerLastName/:phoneNumber/:jobType/:carRego',
    loadChildren: () => import('./termsandconditions/termsandconditions.module').then( m => m.TermsandconditionsPageModule)
  },
  {
    path: 'addphotoIDBack/:customerFirstName/:customerLastName/:phoneNumber/:jobType/:carRego',
    loadChildren: () => import('./photoidbackpage/photoidbackpage.module').then( m => m.PhotoidbackpagePageModule)
  },
  {
    path: 'addphotoIDBack/:customerFirstName/:customerLastName/:phoneNumber/:jobType',
    loadChildren: () => import('./photoidbackpage/photoidbackpage.module').then( m => m.PhotoidbackpagePageModule)
  },
  {
    path: 'detailviewpage/:customerFirstName/:customerLastName/:phoneNumber/:jobType/:carRego',
    loadChildren: () => import('./detailviewpage/detailviewpage.module').then( m => m.DetailviewpagePageModule)
  },
  {
    path: 'detailviewpage/:customerFirstName/:customerLastName/:phoneNumber/:jobType',
    loadChildren: () => import('./detailviewpage/detailviewpage.module').then( m => m.DetailviewpagePageModule)
  }
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
