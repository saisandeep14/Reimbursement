import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receipt } from '../models/receipt.model';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private apiUrl = 'http://localhost:3000/api/receipts';

  constructor(private http: HttpClient) { }

  getReceipts(): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(this.apiUrl, { withCredentials: true });
  }

  getReceipt(id: number): Observable<Receipt> {
    return this.http.get<Receipt>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  submitReceipt(formData: FormData): Observable<Receipt> {
    return this.http.post<Receipt>(this.apiUrl, formData, { withCredentials: true });
  }

  updateReceipt(id: number, receipt: Receipt): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, receipt, { withCredentials: true });
  }

  deleteReceipt(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
