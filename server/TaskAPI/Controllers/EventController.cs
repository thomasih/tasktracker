using Microsoft.AspNetCore.Mvc;
using TaskTrackerAPI.Model;

namespace TaskTrackerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        readonly IEventRepository _eventRepository;
        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpGet("get_events")]
        public IActionResult GetEvents()
        {
            return Ok(_eventRepository.getEvents());
        }

        [HttpGet("get_event/{id}")]
        public IActionResult GetEventById(int id)
        {
            var eventModel = _eventRepository.getEventById(id);
            if (eventModel == null)
            {
                return NotFound();
            }
            return Ok(eventModel);
        }

        [HttpPost("create_event")]
        public IActionResult CreateEvent([FromBody] Event eventModel)
        {
            _eventRepository.createEvent(eventModel);
            var createdEvent = _eventRepository.getEventById(eventModel.Id);
            return Ok(createdEvent);
        }

        [HttpDelete("delete_event/{id}")]
        public IActionResult DeleteEvent(int id)
        {
            var eventModel = _eventRepository.getEventById(id);
            if (eventModel == null)
            {
                return NotFound();
            }

            _eventRepository.deleteEvent(eventModel);
            return Ok();
        }
    }
}