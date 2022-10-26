import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreviewComponent } from './components/preview/preview.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'preview',
    component: PreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
