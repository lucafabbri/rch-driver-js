namespace Rch.Driver.Net.Models
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Group() { }

        public Group(string entry)
        {
            Id = int.Parse(entry.Substring(4, 2));
            Name = entry.Substring(10, 20).Trim();
        }
    }
}