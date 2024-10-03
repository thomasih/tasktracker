namespace TaskTrackerAPI.Model
{
    public class Task
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int PriorityLevel { get; set; }
        public int EventId { get; set; }
        public bool Completed { get; set; }
    }
}
