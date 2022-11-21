import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit {
  myproductform:FormGroup | any;
  color=["red","Black","Blue"];
  categories=["cap","Hoodeis","Watch","Bags"];
  selectSize=["S","M","L","X-L","XX-L"];
  getsizearray : string[]=[];
  imageArray:any=[];

  constructor( private formbuilder:FormBuilder ,
    private productservice:ProductService ) { 
    this.buildform()
  }

  ngOnInit(): void {
  }
  buildform(){
    this.myproductform=this.formbuilder.group({
      productName:new FormControl(''),
      quantity:new FormControl(''),
      color:new FormControl(''),
      price:new FormControl(''),
      description:new FormControl(''),
      companyName:new FormControl(''),
      category:new FormControl(''),
      size:new FormArray([]),
      productMaterial:new FormControl('')
    })
  }
  
  getsize(event:any){
    if(event.target.checked){
      this.getsizearray.push(event.target.value);
    }
    else{
      this.getsizearray=this.getsizearray.filter((value:any)=>
        value!=event.target.value);
        
    }
    console.log(this.getsizearray);
  }

  
  getimage(image:any){
    let fileslength=image.target.files.length;
    console.log(image);
    if(fileslength<=5){
      [...image.target.files].forEach(file=>this.imageArray.push(file));
    }
    else {
      this.imageArray=[];
      
      // this.ToastService.warning(`Image Selction limit is 5 but you have selected ${fileslength}`);
    }
    // console.log(fileslength)
    
  }
   
  createproducts(){
    
    this.getsizearray.forEach((elements:string)=>{
      let formcontrol=new FormControl(elements);
      this.myproductform.get("size").push(formcontrol);
      console.log(elements);
    })
    // this.ToastService.warning(`Image Selction limit is 5 but you have selected`);



    let multipartformdata=new FormData();
    multipartformdata.append('productName',this.myproductform.get('productName').value);
    multipartformdata.append('quantity',this.myproductform.get('quantity').value);
    multipartformdata.append('color',this.myproductform.get('color').value);
    multipartformdata.append('price',this.myproductform.get('price').value);
    multipartformdata.append('description',this.myproductform.get('description').value);
    multipartformdata.append('companyName',this.myproductform.get('companyName').value);
    multipartformdata.append('category',this.myproductform.get('category').value);
    multipartformdata.append('size',this.myproductform.get('size').value);
    this.imageArray.forEach((element:any) => {
      multipartformdata.append('images',element);
    });
    this.productservice.CreateProductCard(multipartformdata).subscribe((ResponseComingFromBackend: any) => {
      ResponseComingFromBackend;
      this.myproductform.reset();
      // this.FileSelect.nativeElement.value = null;
    })

  }


}

