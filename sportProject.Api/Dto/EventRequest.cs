namespace sportProject.Api.Dto
{
    public class EventRequest
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Photo { get; set; }

        public string StartDate { get; set; }

        public string Location { get; set; }

        public string Category { get; set; }

        public int UserId { get; set; }
    }
}
