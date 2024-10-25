import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  private apiKey = 'Ila55mbi2AEOJtdlGZfmwKSkd9SpwM05Z2xxJyr7Wao'; 
  private apiUrl = 'https://api.unsplash.com/photos';

  constructor(private http: HttpClient) {}

  getPhotos(page: number = 1, perPage: number = 10): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Client-ID ${this.apiKey}`);
    return this.http.get<any[]>(`${this.apiUrl}?page=${page}&per_page=${perPage}`, { headers });
  }
}
