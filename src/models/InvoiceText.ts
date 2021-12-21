namespace Rch.Driver.Net.Models
{
    public class InvoiceText
    {
        private string firstRow;
        private string secondRow;
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Enabled { get; set; }
        public InvoiceText() { }
        public InvoiceText(string firstRow, string secondRow)
        {
            this.firstRow = firstRow;
            this.secondRow = secondRow;
            parse();
        }

        private void parse()
        {
            Enabled = firstRow[4] == '1';
            Id = int.Parse(firstRow.Substring(5, 1));
            Name = (firstRow.Substring(10, 24) + secondRow.Substring(10, 24)).Trim();
        }
    }
}