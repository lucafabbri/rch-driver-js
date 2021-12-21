using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rch.Driver.Net.Models.RBS
{
    public class RatePrgObject
    {
        public int Index{ get; set; }
        public int Value{ get; set; }
        public string Rate_type{ get; set; }
        public string Ateco_code{ get; set; }
    }
}
