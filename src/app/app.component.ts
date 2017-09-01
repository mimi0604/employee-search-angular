import { Component, OnInit } from '@angular/core';
import { EmployeeService} from './employee.service';
import { Employee } from './employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  employees: Array<Employee>;

  constructor(private employeeService:EmployeeService){}

  public ngOnInit():void{
    this.getEmployees();
  }
  private getEmployees():void{
      this.employeeService.getEmployees().then(employees => this.employees = employees);
  }
}
