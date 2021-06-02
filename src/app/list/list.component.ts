import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as productsData from '../../assets/sampleData.json';  

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  sub: any;
  sortType: any;

  constructor( private router: Router, private Activatedroute:ActivatedRoute) { }
  
  viewData = []
  prodData: any = (productsData as any).default;

  ngOnInit(): void {
    this.Activatedroute.queryParamMap
       .subscribe(params => {
     this.sortType = params.get('sortType');     
    }); 
    for(let i=0; i<this.prodData.length; i++){
      this.prodData[i]['ImagesArray'] =this.prodData[i]['Images'].split("|")
    }
    
    this.prodData = this.sortByMrp(this.prodData, 'MRP');
    this.asecORDesec()
    
  }

  asecORDesec(){
    if(this.sortType == null){
      this.sortType = 'hightolow'
    }
    else{}
    this.viewData = []
    if(this.sortType.toLowerCase() == 'lowtohigh'){
      if(this.prodData[0]['MRP'] == '99'){

      }
      else{this.prodData = this.prodData.reverse()}
    }
    else{
      this.prodData = this.prodData.reverse();
    }
    this.viewData = this.prodData.slice(0,12)
  }

  onScroll() {
    if(this.viewData.length !== this.prodData.length){
      this.viewData = this.prodData.slice(0, this.viewData.length+12)
    }
    else{
      this.viewData = this.prodData
    }
    console.log('scrolled!!');
  }

  sortByMrp(array, mrp){
    return array.sort(function(a, b){
      var x = a[mrp]; var y = b[mrp];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  dropSelected(e){
    this.sortType = e.target.value.toLowerCase();
    this.router.navigate(['/list'], { queryParams: { sortType: this.sortType } }); 
    this.asecORDesec()
  }
  
}




/*this.imgData = this.prodData[i]['Images'].split("|")
      for(let j=0; j<this.imgData.length; j++){
        
        this.jsonData.push(this.prodData[i]['ListImagePath'] + this.imgData[j])
      }
      this.prodData[i]['ImagesURL'] = this.jsonData
      this.jsonData = []*/
      //console.log(this.jsonData)
      //this.prodData[i]['ImagesArray'] =this.prodData[i]['Images'].split("|")
      //console.log(this.prodData[i]['ImagesArray'][0]); 