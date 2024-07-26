import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _httpClient: HttpClient) { }

  get(url: string): Observable<any> {
    return this._httpClient.get(url);
  }

  post(url: string, model: any): Observable<any> {
    const body = JSON.stringify(model);
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };
    return this._httpClient.post(url, body, options);
  }

  put(url: string, id: number, model: any): Observable<any> {
    const body = JSON.stringify(model);
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };
    return this._httpClient.put(url + id, body, options);
  }

  delete(url: string, id: number): Observable<any> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };
    return this._httpClient.delete(url + id, options);
  }
  postImages(url: string, model: any): Observable<any> {
    return this._httpClient.post(url, model);
  }
}

