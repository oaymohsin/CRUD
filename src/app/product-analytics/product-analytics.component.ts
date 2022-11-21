import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-analytics',
  templateUrl: './product-analytics.component.html',
  styleUrls: ['./product-analytics.component.css']
})
export class ProductAnalyticsComponent implements OnInit {
  productArray:any=[];
  Url:any="http://localhost:8888/";
  particularProductData:any = {};
  constructor(private productservice:ProductService) { }
  
  ngOnInit(): void {
    this.populateProductArray()
  }
  populateProductArray(){
    this.productservice.GetAllProducts().subscribe((ResponseComingFromBackend:any)=>{
      ResponseComingFromBackend.Result.forEach((element:any) => {
        if(element.softDeleteStatus !== 1){
          this.productArray.push(element);
        }
      });
    })
  }
  getParticularData(item:any){
    this.productservice.GetProductById(item).subscribe((res:any)=>{
      this.particularProductData=res.Result;
    })
  }
  deleteProduct(id:any){
    this.productservice.DeleteProductById(id).subscribe((res:any)=>{
      this.productArray=[];
      this.populateProductArray();
    })
  }
}
