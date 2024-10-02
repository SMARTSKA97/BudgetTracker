// Models/Budget.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Models
{
    public class Budget
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int Month { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Budget amount must be greater than zero.")]
        public decimal Amount { get; set; }
    }
}
