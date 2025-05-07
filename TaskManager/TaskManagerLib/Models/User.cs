using System;
using System.Collections.Generic;
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
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;
        [JsonIgnore]
        public virtual ICollection<TaskItem> TaskItems { get; set; }
    }
}
