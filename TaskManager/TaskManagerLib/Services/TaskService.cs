using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagerLib.DTOs;
using TaskManagerLib.Interfaces;
using TaskManagerLib.Models;

namespace TaskManagerLib.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<IEnumerable<TaskItem>> SearchTask(int userId, string status)
        {
            return await _taskRepository.SearchTask(userId, status);
        }

        public async Task<IEnumerable<TaskItem>> GetByUserId(int userId)
        {
            return await _taskRepository.GetTasksByUserId(userId);
        }

        public async Task<TaskItem?> GetById(int id)
        {
            return await _taskRepository.GetById(id);
        }

        public async Task<IEnumerable<TaskItem>> GetByStatus(string status)
        {
            return await _taskRepository.GetTasksByStatus(status);
        }

        public async Task<TaskItem> Create(TaskAdd task)
        {
            TaskItem item = new TaskItem();
            item.Title = task.Title;
            item.Description = task.Description;
            item.Status = task.Status;
            item.UserId = task.UserId;

            await _taskRepository.Add(item);
            await _taskRepository.SaveChanges();
            return item;
        }

        public async Task<bool> Update(TaskAdd task)
        {
            TaskItem item = new TaskItem();
            item.Title = task.Title;
            item.Description = task.Description;
            item.Status = task.Status;
            item.UserId = task.UserId;
            item.Id = task.Id;

            _taskRepository.Update(item);
            return await _taskRepository.SaveChanges();
        }

        public async Task<bool> Delete(int id)
        {
            var task = await _taskRepository.GetById(id);
            if (task == null) return false;

            _taskRepository.Delete(task);
            return await _taskRepository.SaveChanges();
        }
    }
}
