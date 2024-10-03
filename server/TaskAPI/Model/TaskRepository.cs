using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using TaskTrackerAPI.Model;

namespace TaskTrackerAPI.Model
{
    public class TaskRepository : ITaskRepository
    {
        private readonly string _taskFilePath = "Assets/Task.json"; // Path to the task.json file

        private List<Task> ReadTasksFromFile()
        {
            if (!File.Exists(_taskFilePath))
            {
                return new List<Task>(); // If the file doesn't exist, return an empty list
            }

            var taskData = File.ReadAllText(_taskFilePath);
            return JsonSerializer.Deserialize<List<Task>>(taskData) ?? new List<Task>();
        }

        private void WriteTasksToFile(List<Task> tasks)
        {
            var taskData = JsonSerializer.Serialize(tasks, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_taskFilePath, taskData);
        }

        public List<Task> getTasks()
        {
            return ReadTasksFromFile();
        }

        public Task getTasksid(int id)
        {
            return ReadTasksFromFile().FirstOrDefault(t => t.Id == id);
        }

        public void createTask(Task task)
        {
            var tasks = ReadTasksFromFile();
            task.Id = tasks.Count > 0 ? tasks.Max(t => t.Id) + 1 : 1; // Auto-increment ID
            tasks.Add(task);
            WriteTasksToFile(tasks);
        }

        public void updateTask(Task updatedTask)
        {
            var tasks = ReadTasksFromFile();
            var existingTask = tasks.FirstOrDefault(t => t.Id == updatedTask.Id);
            if (existingTask != null)
            {
                existingTask.Description = updatedTask.Description;
                existingTask.PriorityLevel = updatedTask.PriorityLevel;
                existingTask.EventId = updatedTask.EventId;
                existingTask.Completed = updatedTask.Completed;
                WriteTasksToFile(tasks);
            }
        }

        public void deleteTask(Task task)
        {
            var tasks = ReadTasksFromFile();
            var taskToRemove = tasks.FirstOrDefault(t => t.Id == task.Id);
            if (taskToRemove != null)
            {
                tasks.Remove(taskToRemove);
                WriteTasksToFile(tasks);
            }
        }
    }
}
