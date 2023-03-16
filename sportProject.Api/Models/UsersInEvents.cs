using System.ComponentModel.DataAnnotations.Schema;

namespace sportProject.Api.Models
{
    public class UsersInEvents
    {
        public int UserId { get; set; }
        public int EventId { get; set; }


        [ForeignKey("UserId")]
        public User User { get; set; }


        [ForeignKey("EventId")]
        public Event Event { get; set; }
    }
}
