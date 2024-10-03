namespace TaskTrackerAPI.Model
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DueDate { get; set; }
        public int UserId { get; set; }
    }
}
