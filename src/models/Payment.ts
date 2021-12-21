namespace Rch.Driver.Net.Models
{
    public class Payment:AbstractParser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Change { get; set; }
        public bool Cash { get; set; }
        public bool Credit { get; set; }
        public bool Drawer { get; set; }
        public bool Ticket { get; set; }
        public bool InputTotalAmount { get; set; }
        public bool PayDiscount { get; set; }
        public int CreditType { get; set; }

        public Payment() { }

        public Payment(string entry)
        {
            Id = int.Parse(entry.Substring(1, 3));
            Name = entry.Substring(4, 20).Trim();
            Change = entry[24] == '1';
            Cash = entry[25] == '1';
            CreditType = indexChartToInt(entry[26]);
            Credit = CreditType != 0;
            Drawer = entry[27] == '1';
            InputTotalAmount = entry[28] == '1';
            Ticket = entry[29] == '1';
            PayDiscount = entry[31] == '1';
        }
    }
}