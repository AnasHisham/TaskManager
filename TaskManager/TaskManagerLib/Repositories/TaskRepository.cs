using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerLib.Interfaces;
using TaskManagerLib.Models;

namespace TaskManagerLib.Repositories
{
    public class TaskRepository : Repository<TaskItem>, ITaskRepository
    {
        public TaskRepository(TaskManagerDBContext context) : base(context) { }

        public async Task<IEnumerable<TaskItem>> SearchTask(int userId, string status)
        {
            return await _context.TaskItems
                       .Include(x => x.User).Where(x=>(userId <= 0 || x.UserId == userId) && (string.IsNullOrEmpty(status) || x.Status == status))
                       .ToListAsync();
        }

        public async Task<IEnumerable<TaskItem>> GetTasksByStatus(string status)
        {
            return await _context.TaskItems
                .Where(t => t.Status == status)
                .ToListAsync();
        }

        public async Task<IEnumerable<TaskItem>> GetTasksByUserId(int userId)
        {
            return await _context.TaskItems
                       .Where(t => t.UserId == userId).Include(x=>x.User)
                       .ToListAsync();
        }
    }
}
