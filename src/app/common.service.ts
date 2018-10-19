import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: Http) { }

  saveFund(fund) {
    return this.http.post('http://localhost:8080/api/SaveFund/', fund)
  }

  getFund() {
    console.log("CommonService  !!!  GET")
    return this.http.get('http://localhost:8080/api/getFund/')
  }
  deleteFund(id) {
    return this.http.post('http://localhost:8080/api/deleteFund/', { 'id': id })
  }

}
