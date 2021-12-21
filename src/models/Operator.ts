namespace Rch.Driver.Net.Models
{
    public class Operator
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Operator() { }
        public Operator(string entry)
        {
            Id = int.Parse(entry.Substring(1, 3));
            Name = entry.Substring(4, 20).Trim();
        }
    }
}