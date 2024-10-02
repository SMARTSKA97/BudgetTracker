// Models/Expense.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Models
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Description { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Category { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
