using Microsoft.AspNetCore.Mvc;
using TaskTrackerAPI.Model;

namespace TaskTrackerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        readonly ITaskRepository _taskRepository;
        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet("get_tasks")]
        public IActionResult GetTasks()
        {
            return Ok(_taskRepository.getTasks());
        }

        [HttpGet("get_task/{id}")]
        public IActionResult GetTaskById(int id)
        {
            var task = _taskRepository.getTasksid(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost("create_task")]
        public IActionResult CreateTask([FromBody] Model.Task task)
        {
            _taskRepository.createTask(task);
            var createdTask = _taskRepository.getTasksid(task.Id);
            return Ok(createdTask);
        }

        [HttpPut("update_task/{id}")]
        public IActionResult UpdateTask(int id, [FromBody] Model.Task updatedTask)
        {
            var existingTask = _taskRepository.getTasksid(id);
            if (existingTask == null)
            {
                return NotFound();
            }

            existingTask.Description = updatedTask.Description;
            existingTask.PriorityLevel = updatedTask.PriorityLevel;
            existingTask.EventId = updatedTask.EventId;
            existingTask.Completed = updatedTask.Completed;

            _taskRepository.updateTask(existingTask);
            return Ok();
        }

        [HttpDelete("delete_task/{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _taskRepository.getTasksid(id);
            if (task == null)
            {
                return NotFound();
            }

            _taskRepository.deleteTask(task);
            return Ok();
        }
    }
}