import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  @Input() dep: any;
  department_id!: string;
  department_name!: string;

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.department_id=this.dep.department_id;
    this.department_name=this.dep.department_name;
  }
  addDepartment(){
    let val= {department_id:this.department_id,
      department_name:this.department_name};
      this.service.addDepartment(val).subscribe(res=>{
        alert(res.toString());
      });
    
  }
  updateDepartment(){
    let val= {department_id:this.department_id,
      department_name:this.department_name};
      this.service.updateDepartment(val).subscribe(res=>{
        alert(res.toString());
      });

  }

}
