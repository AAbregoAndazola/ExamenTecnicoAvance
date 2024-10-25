import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = 'ohzgpV6DZbT3VCFrErHpvQOmg0dqUKmT'; 
  private apiUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${this.apiKey}&limit=10`;

  constructor(private http: HttpClient) {}

  getTrendingGifs(offset: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}&offset=${offset}`);
  }
}
