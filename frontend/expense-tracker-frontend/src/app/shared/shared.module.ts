import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    ToolbarModule,
    TableModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CalendarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    ToolbarModule,
    TableModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CalendarModule
  ]
})
export class SharedModule { }
