using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using TaskTrackerAPI.Model;

namespace TaskTrackerAPI.Model
{
    public class EventRepository : IEventRepository
    {
        private readonly string _eventFilePath = "Assets/Event.json"; // Path to the event.json file

        private List<Event> ReadEventsFromFile()
        {
            if (!File.Exists(_eventFilePath))
            {
                return new List<Event>(); // If the file doesn't exist, return an empty list
            }

            var eventData = File.ReadAllText(_eventFilePath);
            return JsonSerializer.Deserialize<List<Event>>(eventData) ?? new List<Event>();
        }

        private void WriteEventsToFile(List<Event> events)
        {
            var eventData = JsonSerializer.Serialize(events, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_eventFilePath, eventData);
        }

        public List<Event> getEvents()
        {
            return ReadEventsFromFile();
        }

        public Event getEventById(int id)
        {
            return ReadEventsFromFile().FirstOrDefault(e => e.Id == id);
        }

        public void createEvent(Event eventModel)
        {
            var events = ReadEventsFromFile();
            eventModel.Id = events.Count > 0 ? events.Max(e => e.Id) + 1 : 1; // Auto-increment ID
            events.Add(eventModel);
            WriteEventsToFile(events);
        }

        public void deleteEvent(Event eventModel)
        {
            var events = ReadEventsFromFile();
            var eventToRemove = events.FirstOrDefault(e => e.Id == eventModel.Id);
            if (eventToRemove != null)
            {
                events.Remove(eventToRemove);
                WriteEventsToFile(events);
            }
        }
    }
}
