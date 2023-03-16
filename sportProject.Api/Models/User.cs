using System.ComponentModel.DataAnnotations;
namespace sportProject.Api.Models;

public class User
{
    [Key]
    public int Id { get; set; }
    
    public string Username { get; set; }
    
    public string Email { get; set; }
    
    public string Password { get; set; }
    
    public string Photo { get; set; }

    //Navigation EF 1:N (1 user can create N events)
    public ICollection<Event> EventsCreated { get; set; }


    //Navigation N:N (Attendees)
    public virtual ICollection<UsersInEvents> UsersInEvents { get;}
}