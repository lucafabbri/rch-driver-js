using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rch.Driver.Net.Models.RBS
{
    public class Tender
    {
        public bool Cash{ get; set; }
        public string Name{ get; set; }
        public int Index{ get; set; }
        public bool Change{ get; set; }
        public bool Credit{ get; set; }
        public bool Ticket{ get; set; }
        public bool Opendrawer{ get; set; }
        public bool Other_type{ get; set; }
        public bool Pay_discount{ get; set; }
        public bool Input_total_amount{ get; set; }
        public string Tender_credit_type{ get; set; }
    }
}
