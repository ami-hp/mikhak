import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private http: HttpClient) {}
  getDb() :Observable<any> {
    return this.http.get('/db.json');
  }
}
