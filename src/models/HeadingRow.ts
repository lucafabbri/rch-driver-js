namespace Rch.Driver.Net.Models
{
    public class HeadingRow
    {
        private string firstRow;
        private string secondRow;
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public HeadingRow() { }
        public HeadingRow(string firstRow, string secondRow)
        {
            this.firstRow = firstRow;
            this.secondRow = secondRow;
            parse();
        }

        private void parse()
        {
            Id = int.Parse(firstRow.Substring(1, 3));
            Name = (firstRow.Substring(4, 24) + secondRow.Substring(4, 24)).Trim();
        }
    }
}
