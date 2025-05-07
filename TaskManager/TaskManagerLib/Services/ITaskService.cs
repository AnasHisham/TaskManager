using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerLib.DTOs;
using TaskManagerLib.Models;

namespace TaskManagerLib.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> SearchTask(int userId, string status);
        Task<IEnumerable<TaskItem>> GetByUserId(int userId);
        Task<TaskItem?> GetById(int id);
        Task<IEnumerable<TaskItem>> GetByStatus(string status);
        Task<TaskItem> Create(TaskAdd task);
        Task<bool> Update(TaskAdd task);
        Task<bool> Delete(int id);
    }
}
