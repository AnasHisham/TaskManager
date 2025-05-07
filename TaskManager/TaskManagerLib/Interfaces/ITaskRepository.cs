using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerLib.Models;

namespace TaskManagerLib.Interfaces
{
    public interface ITaskRepository : IRepository<TaskItem>
    {
        Task<IEnumerable<TaskItem>> SearchTask(int userId,string status);

        Task<IEnumerable<TaskItem>> GetTasksByUserId(int userId);

        Task<IEnumerable<TaskItem>> GetTasksByStatus(string status);
    }
}
