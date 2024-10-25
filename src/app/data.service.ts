import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) {}

  getPhotos(start: number = 0, limit: number = 10): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?_start=${start}&_limit=${limit}`);
  }
}
