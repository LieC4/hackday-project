using sportProject.Api.Models;
using System;

namespace sportProject.Api.Data
{
    public class SeedDataBase
    {
        public void PrepPopulation(IApplicationBuilder app)
        {
            using (IServiceScope serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<EventContext>());
            }
        }

        private void SeedData(EventContext? context)
        {
            if (context == null) return;

            //context.Database.EnsureDeleted();
            //context.Database.EnsureCreated();

            if (!context.Users.Any())
            {
                AddAdminUser(context);
                context.SaveChanges();

                AddOtherUsers(context);
                context.SaveChanges();
            }

            if (!context.Events.Any())
            {
                AddExampleEvent(context);
                context.SaveChanges();
            }

            if (!context.UsersInEvents.Any())
            {
                AddAttendees(context);
                context.SaveChanges();
            }
        }

        private void AddAttendees(EventContext context)
        {
            context.UsersInEvents.AddRange(new UsersInEvents
            {
                EventId = 56,
                UserId = 1,
            },
            new UsersInEvents
            {
                EventId = 58,
                UserId = 5,
            });
        }

        private void AddOtherUsers(EventContext context)
        {
            context.Users.AddRange(new User
                {
                    Username = "User 1",
                    Email = "user1@admin.com",
                    Password = "Password",
                    Photo = @"..\..\Media\photoAdmin"
                },
                new User
                {
                    Username = "User 2",
                    Email = "user2@admin.com",
                    Password = "Password",
                    Photo = @"..\..\Media\photoAdmin"
                },
                new User
                {

                    Username = "User 3",
                    Email = "user3@admin.com",
                    Password = "Password",
                    Photo = @"..\..\Media\photoAdmin"
                });
        }

        private void AddExampleEvent(EventContext context)
        {
            context.Events.AddRange(new Event
            {
                Name = "U2",
                Description = "U2 Concert",
                Location = "Madrid",
                StartDate = DateTime.Now.AddMonths(2),
                Photo = string.Empty,
                Category = string.Empty,
                Organizer = context.Users.First(p => p.Id == 1)
            },
            new Event
            {
                Name = "Metallica",
                Description = "Metallica Concert",
                Location = "Guadalajara",
                StartDate = DateTime.Now.AddMonths(3),
                Photo = string.Empty,
                Category = string.Empty,
                Organizer = context.Users.First(p => p.Id == 1)
            },
            new Event
            {
                Name = "Marlango",
                Description = "Marlango Concert",
                Location = "Yebes",
                StartDate = DateTime.Now.AddMonths(5),
                Photo = string.Empty,
                Category = string.Empty,
                Organizer = context.Users.First(p => p.Id == 1)
            });
        }

        private void AddAdminUser(EventContext context)
        {
            var newUser = new User
            {
                Username = "Administrator",
                Email = "admin@admin.com",
                Password = "Password",
                Photo = @"..\..\Media\photoAdmin"
            };

            context.Users.Add(newUser);
        }
    }
}
