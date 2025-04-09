import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Receipt } from '../../models/receipt.model';
import { ReceiptService } from '../../services/receipt.service';

@Component({
  selector: 'app-receipt-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './receipt-list.component.html',
  styleUrls: ['./receipt-list.component.scss']
})
export class ReceiptListComponent implements OnInit {
  receipts: Receipt[] = [];
  loading = true;
  error = '';

  constructor(private receiptService: ReceiptService) { }

  ngOnInit(): void {
    this.loadReceipts();
  }

  loadReceipts(): void {
    this.loading = true;
    this.receiptService.getReceipts().subscribe({
      next: (data) => {
        this.receipts = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load receipts. Please try again.';
        this.loading = false;
        console.error('Error loading receipts:', error);
      }
    });
  }

  getStatusClass(status: string | undefined): string {
    if (!status) return '';
    
    switch (status.toLowerCase()) {
      case 'approved':
        return 'badge bg-success';
      case 'rejected':
        return 'badge bg-danger';
      case 'pending':
      default:
        return 'badge bg-warning text-dark';
    }
  }
}
