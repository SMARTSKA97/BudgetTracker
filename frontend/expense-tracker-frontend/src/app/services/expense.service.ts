import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'https://localhost:5001/api/expenses'; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  // Get all expenses
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  // Get an expense by ID
  getExpenseById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  // Add a new expense
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  // Update an existing expense
  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${expense.id}`, expense);
  }

  // Delete an expense
  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get total expenses
  getTotalExpenses(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  // Get expenses for a specific month
  getExpensesByMonth(year: number, month: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/month/${year}/${month}`);
  }

  // Get total expenses for a specific month
  getTotalExpensesByMonth(month: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total/month/${month}`);
  }

  // Get a summary of expenses
  getSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/summary`);
  }
}
