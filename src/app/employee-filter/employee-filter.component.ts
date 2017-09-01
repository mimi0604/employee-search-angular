import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
 
// Observable class extensions
import 'rxjs/add/observable/of';
 
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
 
import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
 
@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  styleUrls: [ './employee-filter.component.css' ],
})
export class EmployeeFilterComponent implements OnInit {
  employeeOptions: Observable<Array<Employee>>;
  private searchTerms = new Subject<string>();
 
  constructor(
    private employeeService: EmployeeService) {}
 
  // Push a search term into the observable stream.
  autoComplete(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.employeeOptions = this.searchTerms
      .debounceTime(100)
      .distinctUntilChanged()
      .switchMap(term => term? this.employeeService.search(term): Observable.of<Array<Employee>>([]))
      .catch(error => {console.log(error); return Observable.of<Array<Employee>>([]);});

  }
  display(){
    console.log("result");
  }
}