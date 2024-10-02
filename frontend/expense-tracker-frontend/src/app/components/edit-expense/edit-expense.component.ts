// src/app/components/edit-expense/edit-expense.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit {
  expense: Expense = {
    id: 0,
    description: '',
    amount: 0,
    category: '',
    date: new Date()
  };
  categories: string[] = ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Others'];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.expenseService.getExpenseById(id).subscribe({
      next: (data) => this.expense = data,
      error: (err) => this.messageService.add({severity:'error', summary: 'Error', detail: err.message})
    });
  }

  updateExpense(): void {
    if (this.expense.description && this.expense.amount > 0 && this.expense.category) {
      this.expenseService.updateExpense(this.expense).subscribe({
        next: () => {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Expense updated successfully'});
          this.router.navigate(['/expenses']);
        },
        error: (err) => this.messageService.add({severity:'error', summary: 'Error', detail: err.message})
      });
    } else {
      this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Please fill in all fields correctly.'});
    }
  }
}
