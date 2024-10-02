import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
  providers: [MessageService]
})
export class AddExpenseComponent {
  expense: Expense = {
    description: '',
    amount: 0,
    category: '',
    date: new Date()
  };
  categories: string[] = ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Others'];
  errorMessage: string = '';

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private messageService: MessageService
  ) { }

  addExpense(): void {
    if (this.expense.description && this.expense.amount > 0 && this.expense.category && this.expense.date) {
      this.expenseService.addExpense(this.expense).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Expense added successfully' });
          this.router.navigate(['/expenses']);
        },
        error: (err) => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message })
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all fields correctly.' });
    }
  }
}
