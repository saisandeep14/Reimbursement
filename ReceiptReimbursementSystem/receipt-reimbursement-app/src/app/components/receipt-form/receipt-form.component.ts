import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReceiptService } from '../../services/receipt.service';

@Component({
  selector: 'app-receipt-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss']
})
export class ReceiptFormComponent implements OnInit {
  receiptForm!: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.receiptForm = this.fb.group({
      purchaseDate: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      employeeId: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.selectedFile = element.files[0];
    }
  }

  onSubmit(): void {
    if (this.receiptForm.invalid || !this.selectedFile) {
      this.markFormGroupTouched(this.receiptForm);
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('purchaseDate', this.receiptForm.get('purchaseDate')?.value);
    formData.append('amount', this.receiptForm.get('amount')?.value);
    formData.append('description', this.receiptForm.get('description')?.value);
    formData.append('receiptFile', this.selectedFile);
    formData.append('employeeId', this.receiptForm.get('employeeId')?.value);

    this.receiptService.submitReceipt(formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = 'Receipt submitted successfully!';
        this.receiptForm.reset();
        this.selectedFile = null;
        
        // Navigate to receipt list after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/receipts']);
        }, 2000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = 'Error submitting receipt. Please try again.';
        console.error('Error submitting receipt:', error);
      }
    });
  }

  // Helper method to mark all controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
