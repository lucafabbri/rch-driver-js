using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rch.Driver.Net.Models.RBS
{
    public class Prog
    {
        public List<Clerk> Clerk{ get; set; }
        public List<Tender> Tender{ get; set; }
        public InfoMsg Info_msg{ get; set; }
        public List<Department> Department{ get; set; }
        public string Ecr_version{ get; set; }
        public int Prg_version{ get; set; }
        public int Drawer_pulse{ get; set; }
        public int Graphic_foot{ get; set; }
        public int Graphic_logo{ get; set; }
        public int Printer_offset{ get; set; }
        public List<RatePrgObject> Rate_prg_object{ get; set; }
        public bool Vat_ventilation{ get; set; }
        public int Lcd_backlight_timeout{ get; set; }
    }
}
