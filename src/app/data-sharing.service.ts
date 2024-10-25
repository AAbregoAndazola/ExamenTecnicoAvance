import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private selectedItemSource = new BehaviorSubject<any>(null);
  selectedItem$ = this.selectedItemSource.asObservable();

  setSelectedItem(item: any): void {
    this.selectedItemSource.next(item);
  }
}
