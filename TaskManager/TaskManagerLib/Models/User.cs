using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TaskManagerLib.Models
{
    public partial class User
    {
        public User()
        {
            TaskItems = new HashSet<TaskItem>();
        }

        public int Id { get; set; }
        [MaxLength(50, ErrorMessage = "Input must be 50 characters or fewer.")]

        public string Username { get; set; } = null!;
        [MaxLength(100, ErrorMessage = "Input must be 100 characters or fewer.")]

        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;
        [JsonIgnore]
        public virtual ICollection<TaskItem> TaskItems { get; set; }
    }
}
