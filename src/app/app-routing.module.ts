import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductsComponent } from './create-products/create-products.component';
import { ProductAnalyticsComponent } from './product-analytics/product-analytics.component';

const routes: Routes = [
  {
    path:'',component:CreateProductsComponent
  },{
  path:'create-products',component:CreateProductsComponent
},
{path:'productAnalytics',component:ProductAnalyticsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
