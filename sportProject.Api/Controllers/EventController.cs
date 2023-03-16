using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sportProject.Api.Dto;
using sportProject.Api.Models;

namespace sportProject.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly EventContext _context;

        public EventController(EventContext context)
        {
            _context = context;
        }

        // GET: api/Event
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvent()
        {
            if (_context.Events == null)
            {
                return NotFound();
            }
            return await _context.Events.Include(p => p.Organizer)
                                        .Include(f => f.UsersInEvents).ThenInclude(g => g.User)
                                        .ToListAsync();
        }

        // GET: api/Event/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            if (_context.Events == null)
            {
                return NotFound();
            }


            var @event = await _context.Events.Include(p => p.Organizer)
                                              .Include(f => f.UsersInEvents).ThenInclude(g => g.User)
                                              .FirstOrDefaultAsync(p => p.Id == id);

            if (@event == null)
            {
                return NotFound();
            }

            return @event;
        }

        [HttpGet("GetAttenders")]
        //[HttpGet("{eventId}", Name = "GetAttenders")]
        public async Task<ActionResult<IEnumerable<User>>>GetAttenders(int eventId)
        {
            if (_context.Events == null)
            {
                return NotFound();
            }


            var @event = await _context.Events.Include(f => f.UsersInEvents).ThenInclude(g => g.User)
                                              .FirstOrDefaultAsync(p => p.Id == eventId);

            if (@event == null)
            {
                return NotFound();
            }

            var userList = @event.UsersInEvents.Select(p => p.User).ToList();

            return Ok(userList);
        }


        // PUT: api/Event/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, User @event)
        {
            if (id != @event.Id)
            {
                return BadRequest();
            }

            _context.Entry(@event).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Event
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(EventRequest @event)
        {
            if (_context.Events == null)
            {
                return Problem("Entity set 'EventContext.Event'  is null.");
            }

            var organizer = _context.Users.FirstOrDefault(p => p.Id == @event.UserId);

            var newEvent = new Event
            {
                Category = @event.Category,
                Description = @event.Description,
                Location = @event.Location,
                Name = @event.Name,
                Organizer = organizer,
                Photo = @event.Photo,
                StartDate = DateTime.Parse(@event.StartDate)
            };

            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();

            return Ok(newEvent);
        }

        // DELETE: api/Event/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            if (_context.Events == null)
            {
                return NotFound();
            }
            var @event = await _context.Events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            _context.Events.Remove(@event);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        [HttpPost("UserEvent")]
        public async Task<ActionResult<UsersInEvents>> PostUserEvent(int idEvent, int idUser)
        {
            if (_context.Events == null)
            {
                return Problem("Entity set 'EventContext.Event'  is null.");
            }

            var events = _context.Events.FirstOrDefault(p => p.Id.Equals(idEvent));
            if (events == null)
            {
                return NotFound();
            }

            var user = _context.Users.FirstOrDefault(p => p.Id.Equals(idUser));
            if (user == null)
            {
                return NotFound();
            }

            var userInEvent = _context.UsersInEvents.Any(p=>p.EventId.Equals(idEvent) && p.UserId.Equals(idUser));
            if(userInEvent)
            {
                return BadRequest("User already joined");
            }


            var newUsersInEvents = new UsersInEvents
            {
                UserId = idUser,
                EventId = idEvent
            };

            _context.UsersInEvents.Add(newUsersInEvents);
            _context.SaveChanges();

            return Ok(newUsersInEvents);
        }


        [HttpGet("UsersEvent")]
        public async Task<ActionResult<Event>> GetUsersEvent(int idEvent)
        {
            if (_context.Events == null)
            {
                return NotFound();
            }

            try
            {
                /*
                var @event = await _context.Events.FirstOrDefaultAsync(p => p.Id == idEvent);
                if (@event == null)
                {
                    return NotFound();
                }

                var idUsers = _context.UserEvents.Where(p => p.EventId == idEvent)
                                                 .Select(p => p.UserId)
                                                 .ToList();

                var u = _context.Users.Where(d => d.Id == 1).FirstOrDefault();

                var us = _context.Users.FirstOrDefault(p => p.Id.Equals(idUsers.First()));

                var users = _context.Users.Where(p => idUsers.Contains(p.Id));
                */
                return Ok();
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }
        /*

        [HttpGet("UsersEvent")]
        public async Task<ActionResult<Event>> GetUsersEvent(int idEvent)
        {
            if (_context.Event == null)
            {
                return NotFound();
            }


            var @event = await _context.Event.FirstOrDefaultAsync(p => p.Id == idEvent);
            if (@event == null)
            {
                return NotFound();
            }


            var idUsers = _context.UserEvents.Where(p => p.EventId == idEvent)
                                             .Select(p => p.UserId)
                                             .ToList();

            var users = _context.User.Where(p => idUsers.Contains(p.Id)).ToList();

            @event.Attendees = users;

            return Ok(@event);
        }
*/

        private bool EventExists(int id)
        {
            return (_context.Events?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
