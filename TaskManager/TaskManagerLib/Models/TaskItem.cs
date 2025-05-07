using System;
using System.Collections.Generic;

namespace TaskManagerLib.Models
{
    public partial class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public string? Status { get; set; }
        public int UserId { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
