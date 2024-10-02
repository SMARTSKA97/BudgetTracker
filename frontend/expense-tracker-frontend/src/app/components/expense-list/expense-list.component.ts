// src/app/components/expense-list/expense-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../../shared/shared.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [SharedModule,RouterLink],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  selectedExpense: Expense | null = null;
  errorMessage: string = '';

  constructor(
    private expenseService: ExpenseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (data) => this.expenses = data,
      error: (err) => {
        this.errorMessage = err.message;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load expenses.' });
      }
    });
  }

  confirmDelete(expense: Expense): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the expense "${expense.description}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.expenseService.deleteExpense(expense.id!).subscribe({
          next: () => {
            this.loadExpenses();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Expense deleted successfully.' });
          },
          error: (err) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete expense.' })
        });
      }
    });
  }
}
