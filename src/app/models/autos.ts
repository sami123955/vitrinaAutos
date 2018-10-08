import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class Autos {

  private _url = 'assets/data.json';

  constructor(private http: Http) {
     var obj;
  }

  public getJSON(): Observable<any> {
     return this.http.get(this._url).map((res:any) => res.json());
  }
}
