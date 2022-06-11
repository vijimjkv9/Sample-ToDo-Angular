import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//obeservable basically uses for asynchronous response
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly apiUrl = "http://127.0.0.1:8000";
  readonly photoUrl = "http://127.0.0.1:8000/media/";

  constructor(private http:HttpClient) {}

  getDepList():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + '/department/');
  }
  addDepartment(val:any){
    return this.http.post(this.apiUrl + '/department/',val);
  }
  updateDepartment(val:any){
    return this.http.put(this.apiUrl + '/department/',val);
  }
  deleteDepartment(val:any){
    return this.http.delete(this.apiUrl + '/department/'+val);
  }
  getEmpList():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + '/employee/');
  }
  addEmployee(val:any){
    return this.http.post(this.apiUrl + '/employee/',val);
  }
  updateEmployee(val:any){
    return this.http.put(this.apiUrl + '/employee/',val);
  }
  deleteEmployee(val:any){
    return this.http.delete(this.apiUrl + '/employee/'+val);
  }
  uploadPhoto(val:any){
    return this.http.post(this.apiUrl+'/savefile/',val)
  }
  getAllDepartmentNames():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+'/department/');
  }
}



