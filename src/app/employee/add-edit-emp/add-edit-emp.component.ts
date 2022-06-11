import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  @Input() emp: any;
  employee_id!: string;
  employee_name!: string;
  department!: string;
  date_of_joining!: string;
  photo_file_name!:string;
  photo_file_path!:string;

  
  DepartmentList:any=[];

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.loadDepartmentList();
  }
  loadDepartmentList(){
    this.service.getAllDepartmentNames().subscribe((data:any)=>{
      this.DepartmentList=data;

      this.employee_id=this.emp.employee_id;
      this.employee_name=this.emp.employee_name;
      this.department=this.emp.department;
      this.date_of_joining=this.emp.date_of_joining;
      this.photo_file_name=this.emp.photo_file_name;
      this.photo_file_path=this.service.photoUrl+this.photo_file_name;
    });
  }


  addEmployee(){
    let val= {employee_id:this.employee_id,
      employee_name:this.employee_name,
      department:this.department,
      date_of_joining:this.date_of_joining,
      photo_file_name:this.photo_file_name};
      this.service.addEmployee(val).subscribe(res=>{
        alert(res.toString());
      });
    
  }
  updateEmployee(){
    let val= {employee_id:this.employee_id,
      employee_name:this.employee_name,
      department:this.department,
      date_of_joining:this.date_of_joining,
      photo_file_name:this.photo_file_name};
      this.service.updateEmployee(val).subscribe(res=>{
        alert(res.toString());
      });
    }

  uploadPhoto(event:any){

    let file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploaded',file,file.name)
  //  send this form data to api service
    this.service.uploadPhoto(formData).subscribe((data:any)=>{
    this.photo_file_name=data.toString();
    this.photo_file_path=this.service.photoUrl+this.photo_file_name;
    });
  }

}