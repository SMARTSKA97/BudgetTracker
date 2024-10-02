export interface Expense {
    id?: number;            // Optional for new expenses
    description: string;
    amount: number;
    date: Date;            // Use Date object for easier manipulation
    category?: string;     // Optional, if you want to implement categories
  }
  