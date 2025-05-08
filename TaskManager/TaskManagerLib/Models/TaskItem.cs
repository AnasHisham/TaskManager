using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TaskManagerLib.Models
{
    public partial class TaskItem
    {
        public int Id { get; set; }
        [MaxLength(100, ErrorMessage = "Input must be 100 characters or fewer.")]

        public string Title { get; set; } = null!;
        [MaxLength(255, ErrorMessage = "Input must be 255 characters or fewer.")]

        public string? Description { get; set; }
        public string? Status { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
