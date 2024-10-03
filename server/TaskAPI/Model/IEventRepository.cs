namespace TaskTrackerAPI.Model
{
    public interface IEventRepository
    {
        List<Event> getEvents();
        Event getEventById(int id);
        void createEvent(Event eventModel);
        void deleteEvent(Event eventModel);
    }
}
