// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { EditExpenseComponent } from './components/edit-expense/edit-expense.component';
import { ExpenseSummaryComponent } from './components/expense-summary/expense-summary.component';

const routes: Routes = [
  { path: '', redirectTo: '/expenses', pathMatch: 'full' },
  { path: 'expenses', component: ExpenseListComponent },
  { path: 'add-expense', component: AddExpenseComponent },
  { path: 'edit-expense/:id', component: EditExpenseComponent },
  { path: 'summary', component: ExpenseSummaryComponent },
  { path: '**', redirectTo: '/expenses' } // Wildcard route for a 404 page (optional)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export { routes };
