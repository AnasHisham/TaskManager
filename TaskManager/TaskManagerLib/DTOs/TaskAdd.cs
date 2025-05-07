using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagerLib.DTOs
{
    public partial class TaskAdd
    {
        public int Id { get; set; }
        public string? Title { get; set; } 
        public string? Description { get; set; }
        public string? Status { get; set; }
        public int UserId { get; set; }
    }
}
