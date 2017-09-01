import { Injectable } from '@angular/core';
import { Employees } from './mock-employees';
import { Employee } from './employee'
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class EmployeeService {
private employeesUrl = 'api/employees';  // URL to web api

constructor(private http: Http) { }

getEmployees(): Promise<Array<Employee>> {
  return this.http.get(this.employeesUrl)
             .toPromise()
             .then(response => response.json().data as Array<Employee>)
             .catch(this.handleError);
}
search(term: string): Observable<Array<Employee>> {
    let fname = this.http
               .get(`api/employees/?firstname=${term}`)
               .map(response => response.json().data as Array<Employee>);
    let lname = this.http
               .get(`api/employees/?surname=${term}`)
               .map(response => response.json().data as Array<Employee>);
    return fname;
}
private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
}
}

