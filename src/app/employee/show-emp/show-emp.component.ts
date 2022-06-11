import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }
  employeeList:any=[];
  ModalTitle:string | undefined;
  ActivateAddEditEmpComp:boolean=false;
  emp:any;

  ngOnInit(): void {
    this.refreshEmpList();
  }
  addClick(){
    this.emp={  
      employee_id:0,
      employee_name:"",
      data_of_joining:"",
    }
    this.ModalTitle="Add Department";
    this.ActivateAddEditEmpComp=true;
  }
  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList()
  }
  editClick(emps:any){
    this.emp=emps;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditEmpComp=true;
  }
  deleteClick(emps:any){
    if(confirm('Are you sure??')){
      this.service.deleteEmployee(emps.employee_id).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }

  }

 // subscribe method wait untill apicall then only assign the value
  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
       this.employeeList=data;
    });
  }
  

}
