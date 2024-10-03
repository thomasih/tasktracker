namespace TaskTrackerAPI.Model
{
    public interface ITaskRepository
    {
        List<Task> getTasks();
        Task getTasksid(int id);
        void createTask(Task task);
        void updateTask(Task task);
        void deleteTask(Task task);
    }
}
