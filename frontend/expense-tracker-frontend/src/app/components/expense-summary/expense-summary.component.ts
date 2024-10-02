// src/app/components/expense-summary/expense-summary.component.ts
import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-expense-summary',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css']
})
export class ExpenseSummaryComponent implements OnInit {
  totalExpenses: number = 0;
  totalByMonth: number = 0;
  selectedMonth: number = new Date().getMonth() + 1; // Current month
  months: { label: string, value: number }[] = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ];
  errorMessage: string = '';
  budget: number = 0;
  isBudgetExceeded: boolean = false;

  constructor(
    private expenseService: ExpenseService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getTotalExpenses();
    this.getTotalExpensesByMonth(this.selectedMonth);
  }

  getTotalExpenses(): void {
    this.expenseService.getTotalExpenses().subscribe({
      next: (data) => this.totalExpenses = data,
      error: (err) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load total expenses.' })
    });
  }

  getTotalExpensesByMonth(month: number): void {
    this.expenseService.getTotalExpensesByMonth(month).subscribe({
      next: (data) => this.totalByMonth = data,
      error: (err) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load monthly expenses.' })
    });
  }

  onMonthChange(): void {
    this.getTotalExpensesByMonth(this.selectedMonth);
  }

  setBudget(): void {
    if (this.budget > 0) {
      if (this.totalByMonth > this.budget) {
        this.isBudgetExceeded = true;
        this.messageService.add({ severity: 'warn', summary: 'Budget Exceeded', detail: `You've exceeded your budget of $${this.budget}.` });
      } else {
        this.isBudgetExceeded = false;
        this.messageService.add({ severity: 'success', summary: 'Within Budget', detail: `You are within your budget of $${this.budget}.` });
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Invalid Budget', detail: 'Please enter a valid budget amount.' });
    }
  }
}
