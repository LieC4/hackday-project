using Microsoft.EntityFrameworkCore;
using sportProject.Api.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

public class EventContext : DbContext
{
    public EventContext(DbContextOptions<EventContext> options) : base(options) { }

    public DbSet<Event> Events { get; set; } = default!;

    public DbSet<User> Users { get; set; } = default!;

    public DbSet<UsersInEvents> UsersInEvents { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UsersInEvents>().HasKey(e => new { e.UserId, e.EventId });

        modelBuilder.Entity<UsersInEvents>()
                    .HasOne<User>(sc => sc.User)
                    .WithMany(s => s.UsersInEvents)
                    .HasForeignKey(sc => sc.UserId)
                    .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<UsersInEvents>()
                    .HasOne<Event>(sc => sc.Event)
                    .WithMany(s => s.UsersInEvents)
                    .HasForeignKey(sc => sc.EventId)
                    .OnDelete(DeleteBehavior.Restrict); 
    }
}
