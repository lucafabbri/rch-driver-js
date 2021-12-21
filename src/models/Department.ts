namespace Rch.Driver.Net.Models
{
    public class Department extends AbstractParser implements IDepartment
    {
        private string firstRow;
        private string secondRow;
        public int Id { get; set; }
        public string Name { get; set; }
        public int DepartmentType { get; set; }
        public int Price { get; set; }
        public int Halo { get; set; }
        public int Lalo { get; set; }
        public bool Single { get; set; }
        public int VatCode { get; set; }
        public int GroupCode { get; set; }

        public Department() { }
        public Department(string firstRow, string secondRow)
        {
            this.firstRow = firstRow;
            this.secondRow = secondRow;
            parse();
        }

        private void parse()
        {
            Id = int.Parse(firstRow.Substring(1, 3));
            Name = firstRow.Substring(4, 20).Trim();
            Price = parseIntWithDecimal(firstRow.Substring(24, 10));
            Halo = parseIntWithDecimal(secondRow.Substring(4, 10));
            Lalo = parseIntWithDecimal(secondRow.Substring(14, 10));
            VatCode = indexChartToInt(secondRow[24]);
            Single = secondRow[25] == '1';
            GroupCode = int.Parse(secondRow.Substring(26, 2));
            DepartmentType = indexChartToInt(secondRow[28]);
        }
    }
}