using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rch.Driver.Net.Models.RBS
{
    public class Department
    {
        public int vat{ get; set; }
        public int halo{ get; set; }
        public int lalo{ get; set; }
        public string name{ get; set; }
        public int index{ get; set; }
        public int price{ get; set; }
        public bool single{ get; set; }
        public string dpt_type{ get; set; }
        public bool pay_discount { get; set; }
    }
}
