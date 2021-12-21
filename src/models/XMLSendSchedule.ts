namespace Rch.Driver.Net.Models
{
    public class XMLSendSchedule
    {
        public bool Enabled { get; set; }
        public int Hours { get; set; }
        public int Minutes { get; set; }
        public int StartHour { get; set; }
        public int EndHour { get; set; }
        public int StandBy { get; set; }
        public XMLSendSchedule() { }
        public XMLSendSchedule(string entry)
        {
            Enabled = entry[5] == '1';
            Hours = int.Parse(entry.Substring(6, 2));
            Minutes = int.Parse(entry.Substring(8, 2));
            StartHour = int.Parse(entry.Substring(10, 2));
            EndHour = int.Parse(entry.Substring(12, 2));
            StandBy = int.Parse(entry.Substring(14, 2));
        }
    }
}