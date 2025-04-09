export interface Receipt {
    id?: number;
    purchaseDate: Date;
    amount: number;
    description: string;
    receiptFileName?: string;
    receiptFilePath?: string;
    employeeId?: string;
    submissionDate?: Date;
    status?: string;
  }