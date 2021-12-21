using Rch.Driver.Net.Models;
using Rch.Driver.Net.Models.RBS;
using Rch.Driver.Net.Protocol;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Rch.Driver.Net.Models
{
    public class Prog : AbstractParser
  {
    public bool? StatDepartment { get; set; }
    public bool? StatVat { get; set; }
    public bool? StatHour { get; set; }
    public bool? StatClerk { get; set; }
    public bool? StatFinancial { get; set; }
    public bool? StatGrpDetail { get; set; }
    public bool? StatGrpTot { get; set; }
    public List<Logo> Logo { get; set; }
    public List<CourtesyLine> CourtesyLine { get; set; }
    public SlidingMsg SlidingMsg { get; set; }
    public int PercDiscount { get; set; }
    public int PercAddon { get; set; }
    public int DrawerPulse { get; set; }
    public int ECRNum { get; set; }
    public bool? IntInvoice { get; set; }
    public bool? Invoice2Lines { get; set; }
    public bool? InvoiceSubtotal { get; set; }
    public bool? InvoiceClientCheck { get; set; }
    public bool? Fidelity { get; set; }
    public bool? PcsOperatorPrint { get; set; }
    public bool? KbdPrebill { get; set; }
    public PeriodCheck PeriodCheck { get; set; }
    public bool? PrintECRNum { get; set; }
    public bool? SingleQuantity { get; set; }
    public bool? PrintUnitPrice { get; set; }
    public bool? ShowChange { get; set; }
    public bool? MandSubtotal { get; set; }
    public bool? Cutter { get; set; }
    public bool? MidnightAlert { get; set; }
    public bool? CreditNote { get; set; }
    public int CreditNoteProgressive { get; set; }
    public bool? CashDeclaration { get; set; }
    public bool? PrintBuffer { get; set; }
    public bool? DepartmentNet { get; set; }
    public bool? AppendixCut { get; set; }
    public bool? VatVentilation { get; set; }
    public bool? PrintLastReceiptFromDGFE { get; set; }
    public int InvoiceProgressive { get; set; }
    public int ReceiptLimit { get; set; }
    public XMLSendSchedule XMLSendSchedule { get; set; }
    public List<InvoiceText> InvoiceText { get; set; }
    public List<Department> Departments { get; set; }
    public List<Vat> Vats { get; set; }
    public List<Operator> Operators { get; set; }
    public List<Payment> Payments { get; set; }
    public List<Group> Groups { get; set; }
    public List<CourtesyLine> CourtesyLines { get; set; }
    public List<HeadingRow> Headings { get; set; }
        public Prog(RBS.Prog rbsProg)
        {
            DrawerPulse = rbsProg.Drawer_pulse;
            Logo = new List<Logo>();
            Logo logo = new Logo();
            logo.Id = 0;
            logo.Value = rbsProg.Graphic_logo;
            Logo.Add(logo);
            Logo foot = new Logo();
            foot.Id = 1;
            foot.Value = rbsProg.Graphic_foot;
            Logo.Add(foot);
            VatVentilation = rbsProg.Vat_ventilation;
            Operators = new List<Operator>();
            foreach (Clerk clerk in rbsProg.Clerk)
            {
                Operator o = new Operator();
                o.Id = clerk.index;
                o.Name = clerk.name;
                Operators.Add(o);
            }
            Departments = new List<Department>();
            foreach (RBS.Department department in rbsProg.Department)
            {
                Department d = new Department();
                d.VatCode = department.vat;
                d.Halo = department.halo;
                d.Lalo = department.lalo;
                d.Name = department.name;
                d.Id = department.index;
                d.Price = department.price;
                d.Single = department.single;
                d.DepartmentType = Core.DptTypeStringToInt(department.dpt_type);
                Departments.Add(d);
            }
            Payments = new List<Payment>();
            foreach (Tender tender in rbsProg.Tender)
            {
                Payment p = new Payment();
                p.Cash = tender.Cash;
                p.Name = tender.Name;
                p.Id = tender.Index;
                p.Change = tender.Change;
                p.Credit = tender.Credit;
                p.Ticket = tender.Ticket;
                p.Drawer = tender.Opendrawer;
                p.PayDiscount = tender.Pay_discount;
                p.InputTotalAmount = tender.Input_total_amount;
                p.CreditType = Core.CreditStringToInt(tender.Tender_credit_type);
                Payments.Add(p);
            }
            Vats = new List<Vat>();
            foreach (RatePrgObject ratePrgObject in rbsProg.Rate_prg_object)
            {
                Vat v = new Vat();
                v.Id = ratePrgObject.Index;
                v.Value = ratePrgObject.Value;
                v.Type = RbsRateTypeToType(ratePrgObject);
                v.Ateco = ratePrgObject.Ateco_code;
                Vats.Add(v);
            }

        }

        private string RbsRateTypeToType(RatePrgObject ratePrgObject)
        {
            switch (ratePrgObject.Rate_type)
            {
                case "E_RATE_NATURE":
                    return Core.NatureIntToString(ratePrgObject.Value);
                case "E_RATE_VAT":
                    return "VAT";
                case "E_RATE_VENTILATION":
                    return "VI";
            }
            return null;
        }

        public Prog()
        {
            Departments = new List<Department>();
            Vats = new List<Vat>();
            Operators = new List<Operator>();
            Payments = new List<Payment>();
            Groups = new List<Group>();
            Headings = new List<HeadingRow>();
            CourtesyLines = new List<CourtesyLine>();
            CourtesyLines.Add(new Models.CourtesyLine() { Id = 1, Name = "linea di cortesia 1" });
            CourtesyLines.Add(new Models.CourtesyLine() { Id = 2, Name = "linea di cortesia 2" });
            Logo = new List<Logo>();
            SlidingMsg = new SlidingMsg() { Name = "Messaggio scorrevole", Value = 1 };
            StatDepartment = false;
            StatClerk = false;
            StatFinancial = false;
            StatGrpDetail = false;
            StatGrpTot = false;
            StatHour = false;
            StatVat = false;
            PrintECRNum = true;
            SingleQuantity = false;
            PrintUnitPrice = true;
            ShowChange = true;
            MandSubtotal = false;
            Cutter = false;
            MidnightAlert = true;
            CreditNote = false;
            CashDeclaration = false;
            PrintBuffer = true;
            DepartmentNet = false;
            AppendixCut = true;
            VatVentilation = false;
            PrintLastReceiptFromDGFE = true;
            DrawerPulse = 2;
            ECRNum = 1;
            XMLSendSchedule = new XMLSendSchedule { Enabled = true, EndHour = 30, Hours = 40, Minutes = 50, StartHour = 50, StandBy = 10 };


            for (int i = 1; i <= 13; i++)
            {
                Headings.Add(new HeadingRow { Id = i });
            }
        }
    public Prog(List<string> entries)
    {
      Departments = new List<Department>();
      Vats = new List<Vat>();
      Operators = new List<Operator>();
      Payments = new List<Payment>();
      Groups = new List<Group>();
      Headings = new List<HeadingRow>();
      for (int i = 1; i <= 13; i++)
      {
        Headings.Add(new HeadingRow { Id = i });
      }

      for (var i = 0; i < entries.Count; i++)
      {
        var entry = entries[i];
                try
                {
                    switch (entry[0])
                    {
                        case 'R':
                            Departments.Add(new Department(entry, entries[i + 1]));
                            i++;
                            break;
                        case 't':
                            if (CourtesyLines == null)
                            {
                                CourtesyLines = new List<CourtesyLine>();
                            }
                            CourtesyLines.Add(new CourtesyLine(entry, entries[i + 1]));
                            i++;
                            break;
                        case 'H':
                            HeadingRow row = new HeadingRow(entry, entries[i + 1]);
                            try
                            {
                                Headings.First(h => h.Id == row.Id).Name = row.Name;
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine(ex.Message);
                            }
                            i++;
                            break;
                        case 'V':
                            Vats.Add(new Vat(entry));
                            break;
                        case 'T':
                            Payments.Add(new Payment(entry));
                            break;
                        case 'O':
                            Operators.Add(new Operator(entry));
                            break;
                        case 'C':
                            switch (entry.Substring(0, 4))
                            {
                                case "C117":
                                    StatClerk = entry[4] == '1';
                                    StatDepartment = entry[5] == '1';
                                    StatFinancial = entry[6] == '1';
                                    StatHour = entry[7] == '1';
                                    StatVat = entry[8] == '1';
                                    StatGrpDetail = entry[10] == '1';
                                    StatGrpTot = entry[11] == '1';
                                    break;
                                case "C118":
                                    break;
                                case "C119":
                                    break;
                                case "C120":
                                    break;
                                case "C121":
                                    break;
                                case "C122":
                                    DrawerPulse = indexChartToInt(entry[4]);
                                    break;
                                case "C125":
                                    break;
                                case "C126":
                                    MidnightAlert = entry[4] == '1';
                                    break;
                                case "C130":
                                    InvoiceProgressive = int.Parse(entry.Substring(15, 5));
                                    break;
                                case "C132":
                                    PrintECRNum = entry[4] == '1';
                                    ECRNum = int.Parse(entry.Substring(5, 3));
                                    break;
                                case "C133":
                                    InvoiceSubtotal = entry[4] == '1';
                                    break;
                                case "C135":
                                    ReceiptLimit = parseIntWithDecimal(entry.Substring(10, 10));
                                    break;
                                case "C136":
                                    ShowChange = entry[4] == '1';
                                    break;
                                case "C137":
                                    if (Groups == null)
                                    {
                                        Groups = new List<Group>();
                                    }
                                    Groups.Add(new Group(entry));
                                    break;
                                case "C138":
                                    DepartmentNet = entry[4] == '1';
                                    break;
                                case "C139":
                                    CreditNoteProgressive = int.Parse(entry.Substring(10, 10));
                                    break;
                                case "C159":
                                    CreditNote = entry[4] == '1';
                                    break;
                                case "C170":
                                    AppendixCut = entry[4] == '1';
                                    break;
                                case "C808":
                                    XMLSendSchedule = new XMLSendSchedule(entry);
                                    break;
                                case "C822":
                                    VatVentilation = entry[4] == '1';
                                    break;
                                case "C912":
                                    break;
                                case "C917":
                                    Invoice2Lines = entry[5] == '1';
                                    IntInvoice = entry[6] == '1';
                                    InvoiceSubtotal = entry[8] == '1';
                                    InvoiceClientCheck = entry[10] == '1';
                                    break;
                                case "C918":
                                    if (InvoiceText == null)
                                    {
                                        InvoiceText = new List<InvoiceText>();
                                    }
                                    InvoiceText.Add(new InvoiceText(entry, entries[i + 1]));
                                    i++;
                                    break;
                                case "C927":
                                    SingleQuantity = entry[4] == '1';
                                    PrintUnitPrice = entry[5] == '1';
                                    break;
                                case "C928":
                                    break;
                                case "C932":
                                    PrintBuffer = entry[4] == '1';
                                    break;
                                case "C933":
                                    Fidelity = entry[4] == '1';
                                    break;
                                case "C934":
                                    break;
                                case "C935":
                                    PrintLastReceiptFromDGFE = entry[4] == '1';
                                    break;
                                case "C980":
                                    CashDeclaration = entry[4] == '1';
                                    break;
                                case "C988":
                                    PcsOperatorPrint = entry[4] == '1';
                                    break;
                                case "C996":
                                    break;
                                case "C997":
                                    Cutter = entry[4] == '1';
                                    break;
                            }
                            break;
                    }
                }
                catch { }
      }
    }
  }
}
