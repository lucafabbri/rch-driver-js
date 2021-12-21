namespace Rch.Driver.Net.Models
{
    public class Vat : AbstractParser
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Ateco { get; set; }
        public int Value { get; set; }
        public Vat() { }
        public Vat(string entry)
        {
            Id = int.Parse(entry.Substring(1, 3));
            Value = int.Parse(entry.Substring(4, 4));
            var t = int.Parse(entry.Substring(8, 1));
            switch (t)
            {
                case 1:
                    switch (Value)
                    {
                        case 1:
                            Type = "EE";
                            break;
                        case 2:
                            Type = "NS";
                            break;
                        case 3:
                            Type = "NI";
                            break;
                        case 4:
                            Type = "ES";
                            break;
                        case 5:
                            Type = "RM";
                            break;
                        case 6:
                            Type = "AL";
                            break;
                    }
                    break;
                case 2:
                    Type = "VI";
                    break;
                case 0:
                default:
                    Type = "VAT";
                    break;
            }
            Ateco = entry.Substring(9, 6);
        }
    }
}