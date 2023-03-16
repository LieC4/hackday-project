using System.ComponentModel.DataAnnotations;

namespace sportProject.Api.Models;

public class Event
{
    
    [Key]
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Photo { get; set; }
    
    public DateTime StartDate { get; set; }
    
    public string Location { get; set; }
    
    public string Category { get; set; }


    //Navigation EF 1:N (1 user can create N events)//Navigation EF 
    public User Organizer { get; set; }

    //Navigation N:N
    public virtual ICollection<UsersInEvents> UsersInEvents { get; set;}

}