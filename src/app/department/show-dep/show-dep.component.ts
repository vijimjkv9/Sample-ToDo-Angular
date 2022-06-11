import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  departmentList:any=[];
  ModalTitle:string | undefined;
  ActivateAddEditDepComp:boolean=false;
  dep:any;

  department_id_filter:string="";
  department_name_filter:string="";
  departmentlist_without_filter:any=[];

  ngOnInit(): void {
    this.refreshDepList();
  }

  addClick(){
    this.dep={  
      department_id:0,
      department_name:""
    }
    this.ModalTitle="Add Department";
    this.ActivateAddEditDepComp=true;
  }
  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.refreshDepList()
  }
  editClick(depts:any){
    this.dep=depts;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditDepComp=true;
  }
  deleteClick(depts:any){
    if(confirm('Are you sure??')){
      this.service.deleteDepartment(depts.department_id).subscribe(data=>{
        alert(data.toString());
        this.refreshDepList();
      })
    }

  }

 // subscribe method wait untill apicall then only assign the value
  refreshDepList(){
    this.service.getDepList().subscribe(data=>{
       this.departmentList=data;
       this.departmentlist_without_filter=data;
    });
  }
  //filter by id and name
  
  filterFun(){
    let department_id_filter=this.department_id_filter;
    let department_name_filter=this.department_name_filter;
    
    this.departmentList=this.departmentlist_without_filter.filter(function(e1:any){
      return e1.department_id.toString().toLowerCase().includes(
        department_id_filter.toString().trim().toLowerCase()
      )&&
      e1.department_name.toString().toLowerCase().includes(
        department_name_filter.toString().trim().toLocaleLowerCase()
      )
    })
  }
  
sortResult(prob:any,asc:boolean){
  this.departmentList=this.departmentlist_without_filter.sort(function(a:any,b:any){
    if(asc){
      return (a[prob]>b[prob])?1 : ((a[prob]<b[prob]) ?-1 :0);
    }else{
      return (b[prob]>a[prob])?1 : ((a[prob]<b[prob]) ?-1 :0);
    }


  })

}
}
