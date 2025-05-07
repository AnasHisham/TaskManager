using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagerLib.DTOs;
using TaskManagerLib.Models;
using TaskManagerLib.Services;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }


        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll(int userId = -1,string? status = "")
        {
            var tasks = await _taskService.SearchTask(userId, status);
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            var task = await _taskService.GetById(id);
            if (task == null) return NotFound();

            if (User.IsInRole("Admin") || task.UserId == GetCurrentUserId())
                return Ok(task);

            return Forbid();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(TaskAdd task )
        {
            var createdTask = await _taskService.Create(task);
            return CreatedAtAction(nameof(GetById), new { id = createdTask.Id }, createdTask);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, TaskAdd task)
        {
            if (id != task.Id) return BadRequest();

            var existing = await _taskService.GetById(id);
            if (existing == null) return NotFound();

            if (User.IsInRole("Admin"))
            {
                return await _taskService.Update(task) ? NoContent() : BadRequest();
            }

            // Regular user: can only update their own task's status
            if (task.UserId != GetCurrentUserId()) return Forbid();

            existing.Status = task.Status;
            TaskAdd tempTask = new TaskAdd();
            tempTask.Id = existing.Id;
            tempTask.Title = existing.Title;
            tempTask.Description = existing.Description;
            tempTask.Status = existing.Status;
            tempTask.UserId = existing.UserId;

            return await _taskService.Update(tempTask) ? NoContent() : BadRequest();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            return await _taskService.Delete(id) ? NoContent() : NotFound();
        }

        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> GetMyTasks()
        {
            var userId = GetCurrentUserId();
            var tasks = await _taskService.GetByUserId(userId);
            return Ok(tasks);
        }

        private int GetCurrentUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
        }

    }
}
